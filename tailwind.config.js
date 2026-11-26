/** @type {import(tailwindcss).Config} */
module.exports = {
  "content": [
    "./www/**/*.{html,js}"
  ],
  "darkMode": "class",
  "theme": {
    "extend": {
      "fontFamily": {
        "outfit": [
          "Outfit",
          "sans-serif"
        ]
      },
      "colors": {
        "arcade": {
          "space": "#000000",
          "deep": "#09090B",
          "card": "#121215",
          "cardElevated": "#1C1C21",
          "cyan": "rgb(var(--vv-accent-rgb) / <alpha-value>)",
          "emerald": "#10B981",
          "amber": "#F59E0B",
          "pink": "#F43F5E",
          "purple": "rgb(var(--vv-accent-rgb) / <alpha-value>)",
          "lavender": "#FAFAFA",
          "muted": "#A1A1AA"
        }
      },
      "animation": {
        "sound-1": "soundWave 0.75s ease-in-out infinite",
        "sound-2": "soundWave 0.9s ease-in-out infinite 0.15s",
        "sound-3": "soundWave 0.6s ease-in-out infinite 0.3s",
        "sound-4": "soundWave 0.85s ease-in-out infinite 0.1s",
        "sound-5": "soundWave 0.7s ease-in-out infinite 0.25s",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "glow-cyan": "glowCyan 2s ease-in-out infinite alternate",
        "glow-emerald": "glowEmerald 2s ease-in-out infinite alternate",
        "glow-pink": "glowPink 2s ease-in-out infinite alternate",
        "screen-shake": "screenShake 0.35s ease-in-out",
        "float-up": "floatUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "card-flip": "flipIn 0.4s ease-out forwards"
      },
      "keyframes": {
        "soundWave": {
          "0%, 100%": {
            "height": "5px"
          },
          "50%": {
            "height": "18px"
          }
        },
        "pulseRing": {
          "0%": {
            "transform": "scale(0.95)",
            "opacity": "0.85"
          },
          "50%": {
            "transform": "scale(1.35)",
            "opacity": "0.2"
          },
          "100%": {
            "transform": "scale(1.6)",
            "opacity": "0"
          }
        },
        "glowCyan": {
          "0%": {
            "filter": "drop-shadow(0 0 6px rgba(0,229,255,0.4))"
          },
          "100%": {
            "filter": "drop-shadow(0 0 18px rgba(0,229,255,0.9))"
          }
        },
        "glowEmerald": {
          "0%": {
            "filter": "drop-shadow(0 0 6px rgba(0,230,118,0.4))"
          },
          "100%": {
            "filter": "drop-shadow(0 0 18px rgba(0,230,118,0.9))"
          }
        },
        "glowPink": {
          "0%": {
            "filter": "drop-shadow(0 0 6px rgba(255,23,68,0.4))"
          },
          "100%": {
            "filter": "drop-shadow(0 0 18px rgba(255,23,68,0.9))"
          }
        },
        "screenShake": {
          "0%, 100%": {
            "transform": "translate(0, 0)"
          },
          "20%": {
            "transform": "translate(-4px, 2px)"
          },
          "40%": {
            "transform": "translate(4px, -3px)"
          },
          "60%": {
            "transform": "translate(-3px, 3px)"
          },
          "80%": {
            "transform": "translate(2px, -2px)"
          }
        },
        "floatUp": {
          "0%": {
            "transform": "translateY(0) scale(0.9)",
            "opacity": "1"
          },
          "50%": {
            "transform": "translateY(-24px) scale(1.2)",
            "opacity": "1"
          },
          "100%": {
            "transform": "translateY(-45px) scale(1)",
            "opacity": "0"
          }
        },
        "flipIn": {
          "0%": {
            "transform": "rotateY(90deg)",
            "opacity": "0"
          },
          "100%": {
            "transform": "rotateY(0deg)",
            "opacity": "1"
          }
        }
      }
    }
  }
};
