export default function CustomerPageHeading({ word, kicker, description, theme }) {
  return (
    <header className={`customer-page-heading page-banner page-banner--${theme}`}>
      <div className="page-banner-content">
        <h1 className="page-wordmark">{word}</h1>
        <p className="page-kicker">{kicker}</p>
        <p className="page-banner-description">{description}</p>
      </div>
    </header>
  );
}
