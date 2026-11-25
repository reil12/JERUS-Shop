import PatternBackground from './PatternBackground';

export default function CustomerPageBackground({ word, angle }) {
  return (
    <PatternBackground
      word={word}
      angle={angle}
      className="customer-page-background"
    />
  );
}
