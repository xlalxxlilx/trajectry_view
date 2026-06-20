# ASE Trajectory Viewer

Python ASE で読み込める構造・トラジェクトリファイルを、ブラウザ上で 3D アニメーション表示するシンプルな Web アプリです。

## 主な機能

- トラジェクトリのフレーム再生（再生/停止、シーク、速度変更）
- 原子の 3D 表示（元素ごとの色分け）
- 結合表示の ON/OFF
- ユニットセル表示の ON/OFF
- 周期境界を考慮した原子 Wrap 表示（セル内に折り返し）
- キーボード操作でフレーム移動、モデル回転

## 対応形式

ASE が対応する形式を利用できます。代表例は以下です。

- .traj
- .xyz
- .extxyz
- .cif
- .vasp
- .out
- .log
- POSCAR
- CONTCAR

注: 実際の可否は ASE 側のフォーマット判定に依存します。

## 動作環境

- Python 3.10 以降（3.11 / 3.12 でも可）
- pip
- モダンブラウザ（Chrome / Edge / Firefox）

## セットアップ

```bash
cd /home/aimase/Documents/vscode/trajectry_view
python3 -m pip install -r requirements.txt
```

Ubuntu/Kubuntu で PEP 668 によりエラーになる場合:

```bash
python3 -m pip install -r requirements.txt --break-system-packages
```

必要に応じて仮想環境を使ってください。

## 起動方法

### 方法1: 直接起動

```bash
cd /home/aimase/Documents/vscode/trajectry_view
python3 app.py
```

起動後、ブラウザで以下を開きます。

- http://127.0.0.1:5000

### 方法2: デスクトップアイコン経由

`start.sh` を使って起動できます。

```bash
cd /home/aimase/Documents/vscode/trajectry_view
./start.sh
```

### 方法3: Python不要版 (Pyodide + ASE)

ブラウザ内 Python (Pyodide) で ASE を実行する版を追加しています。

- エントリ: `web_pyodide/index.html`
- サーバーAPI不要（`app.py` は使いません）

注意:

- 初回は Pyodide と ASE のロードで時間がかかります
- ファイル形式の解釈はブラウザ内 ASE に依存します

最小手順:

1. `web_pyodide/index.html` をブラウザで開く
2. もしくは任意の静的サーバーで `web_pyodide/` を配信して開く

## 使い方

1. 画面上部の「ファイルを開く」またはドラッグ＆ドロップでファイルを読み込み
2. 下部コントロールで再生/停止、フレーム移動、速度変更
3. 必要に応じて「結合」「ユニットセル」「Wrap」を切り替え

## 操作キー

- Space: 再生/停止
- ← / →: 前後フレーム
- Home / End: 先頭 / 末尾フレーム
- Q / E: 3Dオブジェクトの Z 軸回り回転
- R: カメラリセット

## API

- `POST /api/upload`
  - multipart/form-data で `file` を送信
  - フレーム配列を JSON で返却

## ディレクトリ構成

```text
trajectry_view/
├── app.py
├── requirements.txt
├── start.sh
├── web_pyodide/
│   ├── index.html
│   └── js/
│       └── viewer.js
└── static/
    ├── index.html
    └── js/
        └── viewer.js
```

## ライセンス

必要に応じて追記してください。
