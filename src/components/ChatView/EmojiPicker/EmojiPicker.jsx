import React from "react";
import styles from "./EmojiPicker.module.css";

const EMOJI_LIST = [
  "😀",
  "😂",
  "🥰",
  "",
  "🤔",
  "😢",
  "",
  "👍",
  "👎",
  "❤️",
  "🔥",
  "🎉",
  "",
  "🙏",
  "👋",
  "🤝",
  "✅",
  "❌",
  "⭐",
  "🌟",
  "💬",
  "📎",
  "📷",
  "",
  "🎬",
  "⚡",
  "🌈",
  "🍕",
  "",
  "🍺",
];

export default function EmojiPicker({ onSelect, close }) {
  return (
    <div className={styles["emoji-picker"]}>
      <div className={styles["emoji-grid"]}>
        {EMOJI_LIST.map((emoji, i) => (
          <div
            key={i}
            className={styles["emoji-item"]}
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
