# 変更点サマリ

## 概要
Windows + Chrome 環境で発生していた Pyodide 版の読み込み問題を修正し、ファイル選択・ドラッグ&ドロップ・起動導線を安定化しました。

## 主な修正
- file 直開き時の CORS 失敗を明示化
  - file スキームで開いた場合は実行せず、画面に http 経由起動の案内を表示
  - http / https のときのみ viewer.js を読み込むよう変更
- ドラッグ&ドロップの安定化
  - window レベルで dragenter / dragover / dragleave / drop を監視
  - 既定動作を抑止し、ドロップ時に新規タブ遷移しないよう修正
  - ファイル抽出処理とエラーメッセージ表示を強化
- ファイル選択ボタンの安定化
  - 入力要素をリセットして同一ファイル再選択時も反応
  - キーボード操作にも対応
- 拡張子なしファイル名の読込改善
  - POSCAR / CONTCAR / XDATCAR を考慮した suffix 推定と VASP 再試行を追加
- Windows 起動導線の追加
  - start_pyodide.bat を追加
  - README に localhost 経由での起動手順を追記

## 追加ファイル
- start_pyodide.bat
- CHANGE_SUMMARY.md

## 影響範囲
- web_pyodide/index.html
- web_pyodide/js/viewer.js
- README.md
- start_pyodide.bat

## 動作確認ポイント
- http://127.0.0.1:8080/web_pyodide/index.html で起動できる
- ファイルを開くボタンでファイル選択できる
- xyz などをドラッグ&ドロップしても新規タブ遷移しない
- POSCAR / CONTCAR など拡張子なしファイルの読み込みができる
