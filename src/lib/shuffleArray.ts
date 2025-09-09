/**
 * 配列の要素をランダムに並び替える（Fisher-Yatesアルゴリズム）
 * 元の配列を書き換えず、新しい配列を返す
 * @param {T[]} array - 対象の配列
 * @returns {T[]} - シャッフルされた新しい配列
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  // 元の配列を直接変更しないようにコピーを作成
  const newArray = [...array];

  // 配列の末尾から先頭に向かってループ
  for (let i = newArray.length - 1; i > 0; i--) {
    // 0からiまでのランダムなインデックスを生成
    const j = Math.floor(Math.random() * (i + 1));

    // 要素を交換
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};
