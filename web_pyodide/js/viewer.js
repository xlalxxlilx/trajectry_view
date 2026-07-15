import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ============================================================
// Element data: CPK color, covalent radius (Å), display radius (Å)
// ============================================================
const ELEM = {
  H:  { c: 0xffffff, cov: 0.31, r: 0.25 },
  He: { c: 0xd9ffff, cov: 0.28, r: 0.40 },
  Li: { c: 0xcc80ff, cov: 1.28, r: 0.68 },
  Be: { c: 0xc2ff00, cov: 0.96, r: 0.35 },
  B:  { c: 0xffb5b5, cov: 0.84, r: 0.83 },
  C:  { c: 0x909090, cov: 0.77, r: 0.70 },
  N:  { c: 0x3050f8, cov: 0.75, r: 0.65 },
  O:  { c: 0xff0d0d, cov: 0.73, r: 0.60 },
  F:  { c: 0x90e050, cov: 0.71, r: 0.50 },
  Ne: { c: 0xb3e3f5, cov: 0.69, r: 0.38 },
  Na: { c: 0xab5cf2, cov: 1.66, r: 1.02 },
  Mg: { c: 0x8aff00, cov: 1.41, r: 0.72 },
  Al: { c: 0xbfa6a6, cov: 1.21, r: 0.53 },
  Si: { c: 0xf0c8a0, cov: 1.11, r: 1.10 },
  P:  { c: 0xff8000, cov: 1.07, r: 1.00 },
  S:  { c: 0xffff30, cov: 1.05, r: 1.00 },
  Cl: { c: 0x1ff01f, cov: 1.02, r: 1.00 },
  Ar: { c: 0x80d1e3, cov: 0.97, r: 0.71 },
  K:  { c: 0x8f40d4, cov: 2.03, r: 1.38 },
  Ca: { c: 0x3dff00, cov: 1.76, r: 1.00 },
  Sc: { c: 0xe6e6e6, cov: 1.70, r: 0.75 },
  Ti: { c: 0xbfc2c7, cov: 1.60, r: 0.86 },
  V:  { c: 0xa6a6ab, cov: 1.53, r: 0.79 },
  Cr: { c: 0x8a99c7, cov: 1.39, r: 0.73 },
  Mn: { c: 0x9c7ac7, cov: 1.50, r: 0.67 },
  Fe: { c: 0xe06633, cov: 1.42, r: 0.75 },
  Co: { c: 0xf090a0, cov: 1.26, r: 0.68 },
  Ni: { c: 0x50d050, cov: 1.24, r: 0.69 },
  Cu: { c: 0xc88033, cov: 1.32, r: 0.73 },
  Zn: { c: 0x7d80b0, cov: 1.22, r: 0.88 },
  Ga: { c: 0xc28f8f, cov: 1.22, r: 0.62 },
  Ge: { c: 0x668f8f, cov: 1.20, r: 0.53 },
  As: { c: 0xbd80e3, cov: 1.19, r: 0.58 },
  Se: { c: 0xffa100, cov: 1.20, r: 0.98 },
  Br: { c: 0xa62929, cov: 1.20, r: 1.14 },
  Kr: { c: 0x5cb8d1, cov: 1.16, r: 0.88 },
  Rb: { c: 0x702eb0, cov: 2.20, r: 1.52 },
  Sr: { c: 0x00ff00, cov: 1.95, r: 1.18 },
  Y:  { c: 0x94ffff, cov: 1.90, r: 0.90 },
  Zr: { c: 0x94e0e0, cov: 1.75, r: 0.79 },
  Nb: { c: 0x73c2c9, cov: 1.64, r: 0.72 },
  Mo: { c: 0x54b5b5, cov: 1.54, r: 0.67 },
  Ru: { c: 0x248f8f, cov: 1.46, r: 0.68 },
  Rh: { c: 0x0a7d8c, cov: 1.45, r: 0.67 },
  Pd: { c: 0x006985, cov: 1.44, r: 0.86 },
  Ag: { c: 0xc0c0c0, cov: 1.45, r: 1.15 },
  Cd: { c: 0xffd98f, cov: 1.48, r: 0.97 },
  In: { c: 0xa67573, cov: 1.44, r: 0.80 },
  Sn: { c: 0x668080, cov: 1.41, r: 0.69 },
  Sb: { c: 0x9e63b5, cov: 1.38, r: 0.76 },
  Te: { c: 0xd47a00, cov: 1.35, r: 1.21 },
  I:  { c: 0x940094, cov: 1.33, r: 1.33 },
  Xe: { c: 0x429eb0, cov: 1.31, r: 1.08 },
  Cs: { c: 0x57178f, cov: 2.44, r: 1.67 },
  Ba: { c: 0x00c900, cov: 2.15, r: 1.35 },
  La: { c: 0x70d4ff, cov: 2.07, r: 1.18 },
  Ce: { c: 0xffffc7, cov: 2.04, r: 1.02 },
  W:  { c: 0x2194d6, cov: 1.62, r: 0.74 },
  Re: { c: 0x267dab, cov: 1.51, r: 0.63 },
  Os: { c: 0x266696, cov: 1.44, r: 0.63 },
  Ir: { c: 0x175487, cov: 1.41, r: 0.68 },
  Pt: { c: 0xd0d0e0, cov: 1.36, r: 0.80 },
  Au: { c: 0xffd123, cov: 1.36, r: 1.37 },
  Hg: { c: 0xb8b8d0, cov: 1.32, r: 1.02 },
  Tl: { c: 0xa6544d, cov: 1.45, r: 1.47 },
  Pb: { c: 0x575961, cov: 1.46, r: 1.19 },
  Bi: { c: 0x9e4fb5, cov: 1.48, r: 1.03 },
};
const DEFAULT_ELEM = { c: 0xaaaaaa, cov: 1.0, r: 0.8 };

function getElem(sym) {
  return ELEM[sym] ?? DEFAULT_ELEM;
}

// ============================================================
// TrajectoryViewer
// ============================================================
class TrajectoryViewer {
  constructor() {
    this.frames      = [];
    this.current     = 0;
    this.playing     = false;
    this.fps         = 10;
    this.lastTick    = 0;
    this.showBonds   = true;
    this.showCell    = true;
    this.wrapAtoms   = false;
    this.BOND_TOL    = 1.15;
    this.ROTATE_STEP = Math.PI / 36;
    this.pyodide     = null;
    this.pyReady     = false;
    this.pyInitTask  = null;
    this.centroid    = new THREE.Vector3();
    this._dummy      = new THREE.Object3D();

    this._initScene();
    this._initUI();
  }

  async _initPyodide() {
    if (this.pyReady) return;
    if (this.pyInitTask) return this.pyInitTask;

    this.pyInitTask = (async () => {
      const { loadPyodide } = await import(
        "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs"
      );

      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
      });

      await this.pyodide.loadPackage("micropip");
      await this.pyodide.loadPackage("numpy");
      await this.pyodide.runPythonAsync(`
import json
import os
import tempfile
import micropip

await micropip.install("ase")
import numpy as np
from ase import io as ase_io

def parse_ase_bytes(data_proxy, filename):
    data = bytes(data_proxy.to_py())

    normalized_name = filename.replace("\\\\", "/").split("/")[-1]
    normalized_lower = normalized_name.lower()

    if "." in normalized_name and not normalized_name.startswith("."):
        suffix = "." + normalized_name.rsplit(".", 1)[1]
    elif normalized_lower in ("poscar", "contcar", "xdatcar"):
        suffix = ".vasp"
    else:
        # Extensionless files are common on Windows. Give ASE a neutral suffix.
        suffix = ".traj"

    tmp_path = None
    try:
        fd, tmp_path = tempfile.mkstemp(prefix="ase_pyodide_", suffix=suffix)
        os.close(fd)
        with open(tmp_path, "wb") as f:
            f.write(data)

        try:
            frames_raw = ase_io.read(tmp_path, index=":")
        except Exception as first_err:
            # Retry with explicit format for extensionless VASP-style filenames.
            if normalized_lower in ("poscar", "contcar", "xdatcar"):
                frames_raw = ase_io.read(tmp_path, index=":", format="vasp")
            else:
                raise first_err
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

    if not isinstance(frames_raw, list):
        frames_raw = [frames_raw]

    if not frames_raw:
        raise ValueError("トラジェクトリにフレームがありません")

    trajectory = []
    for atoms in frames_raw:
        frame = {
            "atoms": [
                {"symbol": sym, "position": pos.tolist()}
                for sym, pos in zip(atoms.get_chemical_symbols(), atoms.get_positions())
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

    return json.dumps(
        {
            "frames": trajectory,
            "n_frames": len(trajectory),
            "n_atoms": len(frames_raw[0]),
            "filename": filename,
        },
        ensure_ascii=False,
    )
`);

      this.pyReady = true;
    })();

    try {
      await this.pyInitTask;
    } catch (err) {
      this.pyInitTask = null;
      throw err;
    }
  }

  async _parseWithPyodide(file) {
    const arrayBuffer = await file.arrayBuffer();
    const dataBytes = new Uint8Array(arrayBuffer);
    const parseFn = this.pyodide.globals.get("parse_ase_bytes");
    try {
      const resultJson = parseFn(dataBytes, file.name);
      return JSON.parse(resultJson);
    } finally {
      parseFn.destroy();
    }
  }

  // ── Scene setup ─────────────────────────────────────────
  _initScene() {
    const container = document.getElementById("viewport");

    this.scene    = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d1117);

    const w = container.clientWidth  || window.innerWidth;
    const h = container.clientHeight || (window.innerHeight - 80);

    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.01, 5000);
    this.camera.position.set(0, 0, 30);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = true;

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dl1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dl1.position.set(5, 8, 5);
    this.scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0x8888ff, 0.35);
    dl2.position.set(-5, -3, -8);
    this.scene.add(dl2);

    // Object groups
    this.modelGroup = new THREE.Group();
    this.atomGroup = new THREE.Group();
    this.bondGroup = new THREE.Group();
    this.cellGroup = new THREE.Group();
    this.modelGroup.add(this.atomGroup, this.bondGroup, this.cellGroup);
    this.scene.add(this.modelGroup);

    // Shared unit-sphere geometry for all atoms
    this._sphereGeo = new THREE.SphereGeometry(1, 22, 17);

    // Responsive resize
    new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }).observe(container);

    this.renderer.setAnimationLoop((t) => this._loop(t));
  }

  // ── UI wiring ────────────────────────────────────────────
  _initUI() {
    const $ = (id) => document.getElementById(id);
    this.ui = {
      frameHud:    $("frame-hud"),
      energyHud:   $("energy-hud"),
      forceHud:    $("force-hud"),
      dropOverlay: $("drop-overlay"),
      frameSlider: $("frame-slider"),
      frameCount:  $("frame-counter"),
      speedSlider: $("speed-slider"),
      speedVal:    $("speed-val"),
      btnPlay:     $("btn-play"),
      btnFirst:    $("btn-first"),
      btnPrev:     $("btn-prev"),
      btnNext:     $("btn-next"),
      btnLast:     $("btn-last"),
      btnBonds:    $("btn-bonds"),
      btnCell:     $("btn-cell"),
      btnWrap:     $("btn-wrap"),
      btnCam:      $("btn-cam"),
      fileInput:   $("file-input"),
      uploadBtn:   $("upload-btn"),
      loading:     $("loading"),
      fileInfo:    $("file-info"),
      errorMsg:    $("error-msg"),
    };

    // File controls
    this.ui.uploadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Reset to allow selecting the same file repeatedly.
      this.ui.fileInput.value = "";
      this.ui.fileInput.click();
    });
    this.ui.uploadBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.ui.fileInput.value = "";
        this.ui.fileInput.click();
      }
    });
    this.ui.fileInput.addEventListener("change", (e) => {
      if (e.target.files[0]) this.loadFile(e.target.files[0]);
    });

    // Drag & drop
    this._dragDepth = 0;
    const onDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this._eventHasFiles(e)) return;
      this._dragDepth += 1;
      document.body.classList.add("drag-over");
    };
    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this._eventHasFiles(e)) return;
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
      document.body.classList.add("drag-over");
    };
    const onDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this._eventHasFiles(e)) return;
      this._dragDepth = Math.max(0, this._dragDepth - 1);
      if (this._dragDepth === 0) document.body.classList.remove("drag-over");
    };
    const onDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this._eventHasFiles(e)) return;
      this._dragDepth = 0;
      document.body.classList.remove("drag-over");
      const f = this._extractFileFromDataTransfer(e.dataTransfer);
      if (f) {
        this.loadFile(f);
      } else {
        this._showError("ドロップからファイルを取得できませんでした。通常のファイルをドロップしてください。");
      }
    };

    // Catch drag events at window level for better behavior across browsers/OS.
    window.addEventListener("dragenter", onDragEnter, false);
    window.addEventListener("dragover", onDragOver, false);
    window.addEventListener("dragleave", onDragLeave, false);
    window.addEventListener("drop", onDrop, false);

    // Playback buttons
    this.ui.btnPlay.addEventListener("click",  () => this.togglePlay());
    this.ui.btnFirst.addEventListener("click", () => { this._stopPlay(); this._goTo(0); });
    this.ui.btnPrev.addEventListener("click",  () => { this._stopPlay(); this._goTo(this.current - 1); });
    this.ui.btnNext.addEventListener("click",  () => { this._stopPlay(); this._goTo(this.current + 1); });
    this.ui.btnLast.addEventListener("click",  () => { this._stopPlay(); this._goTo(this.frames.length - 1); });

    this.ui.frameSlider.addEventListener("input", (e) => {
      this._stopPlay();
      this._goTo(parseInt(e.target.value));
    });

    this.ui.speedSlider.addEventListener("input", (e) => {
      this.fps = parseInt(e.target.value);
      this.ui.speedVal.textContent = `${this.fps} fps`;
    });

    // Visibility toggles
    this.ui.btnBonds.addEventListener("click", () => {
      this.showBonds = !this.showBonds;
      this.ui.btnBonds.classList.toggle("on", this.showBonds);
      this.bondGroup.visible = this.showBonds;
    });
    this.ui.btnCell.addEventListener("click", () => {
      this.showCell = !this.showCell;
      this.ui.btnCell.classList.toggle("on", this.showCell);
      this.cellGroup.visible = this.showCell;
    });
    this.ui.btnWrap.addEventListener("click", () => {
      this.wrapAtoms = !this.wrapAtoms;
      this.ui.btnWrap.classList.toggle("on", this.wrapAtoms);
      if (this.frames.length) this._goTo(this.current);
    });

    // Camera reset
    this.ui.btnCam.addEventListener("click", () => this.fitCamera());

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (!this.frames.length) return;
      switch (e.key) {
        case " ":          e.preventDefault(); this.togglePlay(); break;
        case "ArrowLeft":  this._stopPlay(); this._goTo(this.current - 1); break;
        case "ArrowRight": this._stopPlay(); this._goTo(this.current + 1); break;
        case "Home":       this._stopPlay(); this._goTo(0); break;
        case "End":        this._stopPlay(); this._goTo(this.frames.length - 1); break;
        case "r": case "R": this.fitCamera(); break;
        case "q": case "Q": this.rotateModelZ(1); break;
        case "e": case "E": this.rotateModelZ(-1); break;
      }
    });
  }

  // ── File upload ──────────────────────────────────────────
  async loadFile(file) {
    const ui = this.ui;
    ui.loading.style.display  = "inline";
    ui.loading.textContent    = "⏳ Pyodide初期化中...";
    ui.errorMsg.style.display = "none";
    ui.fileInfo.textContent   = "";

    try {
      await this._initPyodide();
      ui.loading.textContent = "⏳ ファイル解析中...";
      const data = await this._parseWithPyodide(file);
      this._loadTrajectory(data, file.name);
    } catch (err) {
      ui.errorMsg.textContent   = `⚠ ${err.message}`;
      ui.errorMsg.style.display = "inline";
    } finally {
      ui.loading.style.display = "none";
      ui.loading.textContent = "⏳ 読み込み中...";
    }
  }

  _showError(message) {
    this.ui.errorMsg.textContent = `⚠ ${message}`;
    this.ui.errorMsg.style.display = "inline";
  }

  _eventHasFiles(e) {
    const dt = e.dataTransfer;
    if (!dt) return false;
    if (dt.types && Array.from(dt.types).includes("Files")) return true;
    if (dt.items) {
      for (const item of dt.items) {
        if (item.kind === "file") return true;
      }
    }
    return false;
  }

  _extractFileFromDataTransfer(dt) {
    if (!dt) return null;
    if (dt.files && dt.files.length > 0) return dt.files[0];

    if (dt.items) {
      for (const item of dt.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) return file;
        }
      }
    }
    return null;
  }

  _loadTrajectory(data, filename) {
    this.frames  = data.frames;
    this.current = 0;

    const n = this.frames.length;
    const ui = this.ui;

    ui.frameSlider.max      = n - 1;
    ui.frameSlider.value    = 0;
    ui.frameSlider.disabled = n <= 1;
    ui.btnPlay.disabled     = n <= 1;
    [ui.btnFirst, ui.btnPrev, ui.btnNext, ui.btnLast].forEach(
      (b) => (b.disabled = false)
    );
    ui.dropOverlay.style.display = "none";
    ui.frameHud.style.display    = "block";
    ui.fileInfo.textContent =
      `${filename}  |  ${data.n_atoms} 原子  |  ${n} フレーム`;

    this._renderFrame(0);
    this._updateHUD();
    this.fitCamera();
  }

  // ── Frame navigation ─────────────────────────────────────
  _goTo(idx) {
    idx = Math.max(0, Math.min(idx, this.frames.length - 1));
    if (idx === this.current && this.atomGroup.children.length > 0) return;
    this.current = idx;
    this._renderFrame(idx);
    this._updateHUD();
  }

  togglePlay() {
    this.playing ? this._stopPlay() : this._startPlay();
  }

  _startPlay() {
    if (this.frames.length <= 1) return;
    this.playing   = true;
    this.lastTick  = performance.now();
    this.ui.btnPlay.textContent = "⏸";
    this.ui.btnPlay.classList.add("playing");
  }

  _stopPlay() {
    this.playing = false;
    this.ui.btnPlay.textContent = "▶";
    this.ui.btnPlay.classList.remove("playing");
  }

  // ── Render loop ──────────────────────────────────────────
  _loop(time) {
    if (this.playing && this.frames.length > 1) {
      if (time - this.lastTick >= 1000 / this.fps) {
        this.lastTick = time;
        const next = (this.current + 1) % this.frames.length;
        this.current = next;
        this._renderFrame(next);
        this._updateHUD();
      }
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // ── Frame rendering ──────────────────────────────────────
  _renderFrame(idx) {
    const frame = this.frames[idx];
    const atoms = this._getDisplayAtoms(frame);

    // Compute centroid
    let cx = 0, cy = 0, cz = 0;
    atoms.forEach((a) => {
      cx += a.position[0];
      cy += a.position[1];
      cz += a.position[2];
    });
    cx /= atoms.length; cy /= atoms.length; cz /= atoms.length;
    this.centroid.set(cx, cy, cz);

    this._updateAtoms(atoms, cx, cy, cz);
    this._updateBonds(atoms, cx, cy, cz);
    this._updateCell(frame, cx, cy, cz);
  }

  _getDisplayAtoms(frame) {
    if (!this.wrapAtoms) return frame.atoms;
    const { cell, pbc } = frame;
    if (!cell || !pbc || !pbc.some(Boolean)) return frame.atoms;

    const m = [
      [cell[0][0], cell[1][0], cell[2][0]],
      [cell[0][1], cell[1][1], cell[2][1]],
      [cell[0][2], cell[1][2], cell[2][2]],
    ];
    const inv = this._invert3(m);
    if (!inv) return frame.atoms;

    return frame.atoms.map((atom) => {
      const frac = this._mulMatVec(inv, atom.position);
      for (let i = 0; i < 3; i++) {
        if (pbc[i]) frac[i] = frac[i] - Math.floor(frac[i]);
      }
      return {
        symbol: atom.symbol,
        position: this._mulMatVec(m, frac),
      };
    });
  }

  _mulMatVec(m, v) {
    return [
      m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
      m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
      m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
    ];
  }

  _invert3(m) {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];

    const A =  e * i - f * h;
    const B = -d * i + f * g;
    const C =  d * h - e * g;
    const D = -b * i + c * h;
    const E =  a * i - c * g;
    const F = -a * h + b * g;
    const G =  b * f - c * e;
    const H = -a * f + c * d;
    const I =  a * e - b * d;

    const det = a * A + b * B + c * C;
    if (Math.abs(det) < 1e-12) return null;

    const invDet = 1 / det;
    return [
      [A * invDet, D * invDet, G * invDet],
      [B * invDet, E * invDet, H * invDet],
      [C * invDet, F * invDet, I * invDet],
    ];
  }

  // ── Atoms (InstancedMesh, reuses meshes when composition unchanged) ──
  _updateAtoms(atoms, cx, cy, cz) {
    // Group positions by element
    const byElem = {};
    atoms.forEach((a) => {
      (byElem[a.symbol] ??= []).push(a.position);
    });

    // Check if existing meshes can be reused (same elements & counts)
    const existing = {};
    for (const m of this.atomGroup.children) existing[m.userData.sym] = m;

    const newSyms   = Object.keys(byElem);
    const canReuse  =
      newSyms.length === this.atomGroup.children.length &&
      newSyms.every(
        (s) => existing[s] && existing[s].count === byElem[s].length
      );

    if (!canReuse) {
      // Dispose materials (geometry is shared, don't dispose it)
      for (const m of this.atomGroup.children) m.material.dispose();
      this.atomGroup.clear();

      for (const sym of newSyms) {
        const e   = getElem(sym);
        const mat = new THREE.MeshPhongMaterial({
          color:    e.c,
          shininess: 80,
          specular: new THREE.Color(0x222222),
        });
        const mesh = new THREE.InstancedMesh(
          this._sphereGeo,
          mat,
          byElem[sym].length
        );
        mesh.userData.sym = sym;
        this.atomGroup.add(mesh);
        existing[sym] = mesh;
      }
    }

    // Update instance matrices (always)
    const dummy = this._dummy;
    for (const sym of newSyms) {
      const mesh      = existing[sym];
      const positions = byElem[sym];
      const r         = getElem(sym).r;
      positions.forEach((pos, i) => {
        dummy.position.set(pos[0] - cx, pos[1] - cy, pos[2] - cz);
        dummy.scale.setScalar(r);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  // ── Bonds (LineSegments) ──────────────────────────────────
  _updateBonds(atoms, cx, cy, cz) {
    // Dispose previous
    if (this.bondGroup.children.length) {
      const old = this.bondGroup.children[0];
      old.geometry.dispose();
      old.material.dispose();
      this.bondGroup.clear();
    }

    if (!this.showBonds || atoms.length > 600) return;

    const verts = [];
    const n     = atoms.length;
    for (let i = 0; i < n; i++) {
      const ai = atoms[i];
      const ri = getElem(ai.symbol).cov;
      for (let j = i + 1; j < n; j++) {
        const aj = atoms[j];
        const rj = getElem(aj.symbol).cov;
        const dx = ai.position[0] - aj.position[0];
        const dy = ai.position[1] - aj.position[1];
        const dz = ai.position[2] - aj.position[2];
        const d2 = dx * dx + dy * dy + dz * dz;
        const cut = (ri + rj) * this.BOND_TOL;
        if (d2 < cut * cut && d2 > 0.09) {
          verts.push(
            ai.position[0] - cx, ai.position[1] - cy, ai.position[2] - cz,
            aj.position[0] - cx, aj.position[1] - cy, aj.position[2] - cz
          );
        }
      }
    }

    if (verts.length) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
      const mat = new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.65,
      });
      this.bondGroup.add(new THREE.LineSegments(geo, mat));
    }
  }

  // ── Unit cell box ─────────────────────────────────────────
  _updateCell(frame, cx, cy, cz) {
    if (this.cellGroup.children.length) {
      const old = this.cellGroup.children[0];
      old.geometry.dispose();
      old.material.dispose();
      this.cellGroup.clear();
    }

    const { cell, pbc } = frame;
    if (!this.showCell || !pbc || !pbc.some(Boolean)) return;

    const [a, b, c] = cell.map((v) => new THREE.Vector3(...v));
    const o = new THREE.Vector3(-cx, -cy, -cz);

    const pts = [
      o.clone(),
      o.clone().add(a),
      o.clone().add(b),
      o.clone().add(c),
      o.clone().add(a).add(b),
      o.clone().add(a).add(c),
      o.clone().add(b).add(c),
      o.clone().add(a).add(b).add(c),
    ];

    const edges = [0,1, 0,2, 0,3, 1,4, 1,5, 2,4, 2,6, 3,5, 3,6, 4,7, 5,7, 6,7];
    const verts = [];
    for (let k = 0; k < edges.length; k += 2) {
      const p = pts[edges[k]], q = pts[edges[k + 1]];
      verts.push(p.x, p.y, p.z, q.x, q.y, q.z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.55,
    });
    this.cellGroup.add(new THREE.LineSegments(geo, mat));
  }

  // ── HUD update ────────────────────────────────────────────
  _updateHUD() {
    const n     = this.frames.length;
    const i     = this.current;
    const frame = this.frames[i];
    const ui    = this.ui;

    ui.frameSlider.value   = i;
    ui.frameCount.textContent = `${i + 1} / ${n}`;
    ui.frameHud.textContent   = `Frame ${i + 1} / ${n}`;

    if (frame.energy !== undefined) {
      ui.energyHud.style.display = "block";
      ui.energyHud.textContent   = `E = ${frame.energy.toFixed(5)} eV`;
    } else {
      ui.energyHud.style.display = "none";
    }

    if (frame.max_force !== undefined) {
      ui.forceHud.style.display = "block";
      ui.forceHud.textContent   = `Fmax = ${frame.max_force.toFixed(4)} eV/Å`;
    } else {
      ui.forceHud.style.display = "none";
    }
  }

  // ── Camera fit ────────────────────────────────────────────
  fitCamera() {
    if (!this.frames.length) return;
    const frame = this.frames[this.current];
    const atoms = this._getDisplayAtoms(frame);
    const cx = this.centroid.x, cy = this.centroid.y, cz = this.centroid.z;

    let maxR = 1;
    atoms.forEach((a) => {
      const dx = a.position[0] - cx;
      const dy = a.position[1] - cy;
      const dz = a.position[2] - cz;
      maxR = Math.max(maxR, Math.sqrt(dx * dx + dy * dy + dz * dz));
    });

    // Include cell vectors
    const { cell, pbc } = frame;
    if (pbc && pbc.some(Boolean)) {
      cell.forEach((v) => {
        maxR = Math.max(maxR, Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2) * 0.6);
      });
    }

    const dist = Math.max(maxR * 2.8, 6);
    this.camera.position.set(dist * 0.45, dist * 0.25, dist);
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  rotateModelZ(direction) {
    this.modelGroup.rotateZ(direction * this.ROTATE_STEP);
  }
}

// ── Bootstrap ────────────────────────────────────────────────
window.viewer = new TrajectoryViewer();
