import os
import tempfile
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="static")
app.config["MAX_CONTENT_LENGTH"] = 500 * 1024 * 1024  # 500 MB


@app.route("/")
def index():
    return send_from_directory("static", "index.html")


@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "ファイルが提供されていません"}), 400

    file = request.files["file"]
    filename = file.filename or "trajectory"
    _, ext = os.path.splitext(filename)
    ext = ext.lower() if ext else ".traj"

    tmp_path = None
    try:
        import ase.io
        import numpy as np

        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name

        frames_raw = ase.io.read(tmp_path, index=":")
        if not isinstance(frames_raw, list):
            frames_raw = [frames_raw]

        if not frames_raw:
            return jsonify({"error": "トラジェクトリにフレームがありません"}), 400

        trajectory = []
        for atoms in frames_raw:
            frame = {
                "atoms": [
                    {"symbol": sym, "position": pos.tolist()}
                    for sym, pos in zip(
                        atoms.get_chemical_symbols(), atoms.get_positions()
                    )
                ],
                "cell": atoms.get_cell().tolist(),
                "pbc": atoms.get_pbc().tolist(),
            }
            try:
                frame["energy"] = float(atoms.get_potential_energy())
            except Exception:
                pass
            try:
                forces = atoms.get_forces()
                frame["max_force"] = float(np.linalg.norm(forces, axis=1).max())
            except Exception:
                pass
            trajectory.append(frame)

        return jsonify(
            {
                "frames": trajectory,
                "n_frames": len(trajectory),
                "n_atoms": len(frames_raw[0]),
                "filename": filename,
            }
        )

    except ImportError:
        return (
            jsonify(
                {
                    "error": "ASEがインストールされていません。pip install ase を実行してください。"
                }
            ),
            500,
        )
    except Exception as e:
        return jsonify({"error": f"読み込みエラー: {str(e)}"}), 400
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")
