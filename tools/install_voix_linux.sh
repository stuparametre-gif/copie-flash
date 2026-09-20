#!/bin/bash
# Installe la voix française pour Copie Flash sur Linux (Arch / Omarchy) :
#  - Piper (synthèse neuronale locale, hors-ligne) depuis l'AUR ;
#  - la voix fr_FR-siwis-medium (~63 Mo) dans ~/.local/share/piper/.
# Sur Mac / iPhone / iPad il n'y a rien à installer : l'app utilise les voix du système.
set -e
VOIX=fr_FR-siwis-medium
DIR="$HOME/.local/share/piper"
BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium"

if ! command -v piper-tts >/dev/null && ! command -v piper >/dev/null; then
  if command -v yay >/dev/null; then yay -S --needed piper-tts-bin
  else echo "Installe piper-tts-bin (AUR) puis relance ce script."; exit 1; fi
fi
mkdir -p "$DIR"
[ -f "$DIR/$VOIX.onnx" ] || curl -L -o "$DIR/$VOIX.onnx" "$BASE/$VOIX.onnx"
[ -f "$DIR/$VOIX.onnx.json" ] || curl -L -o "$DIR/$VOIX.onnx.json" "$BASE/$VOIX.onnx.json"
echo "Test :" && echo "Bonjour, on commence la dictée." | $(command -v piper-tts || command -v piper) --model "$DIR/$VOIX.onnx" --output_file /tmp/piper-test.wav && (pw-play /tmp/piper-test.wav 2>/dev/null || aplay /tmp/piper-test.wav)
echo "OK — relance Copie Flash."
