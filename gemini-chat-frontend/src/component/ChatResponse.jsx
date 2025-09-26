// Professional Text Formatter Component
const ProfessionalTextFormatter = ({ text }) => {
  const formatText = (text) => {
    const lines = text.split('\n');
    const formattedElements = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle main headers (lines with ** and ending with :)
      if (trimmedLine.includes('**') && trimmedLine.endsWith(':')) {
        const headerText = trimmedLine.replace(/\*\*/g, '').replace(':', '');
        formattedElements.push(
          <div key={`section-${index}`} className="professional-section-header">
            <div className="section-icon">
              <i className="bi bi-folder-open"></i>
            </div>
            <h4 className="section-title">{headerText}</h4>
          </div>
        );
      }
      // Handle bullet points
      else if (trimmedLine.startsWith('*   ') || trimmedLine.startsWith('* ')) {
        const bulletText = trimmedLine.replace(/^\*\s*/, '');
        const formattedBullet = formatInlineElements(bulletText);
        formattedElements.push(
          <div key={`bullet-${index}`} className="professional-bullet-item">
            <div className="bullet-marker"></div>
            <div className="bullet-text">{formattedBullet}</div>
          </div>
        );
      }
      // Handle numbered lists
      else if (/^\d+\.\s/.test(trimmedLine)) {
        const numberMatch = trimmedLine.match(/^(\d+)\.\s(.+)/);
        if (numberMatch) {
          const [, number, listText] = numberMatch;
          const formattedListText = formatInlineElements(listText);
          formattedElements.push(
            <div key={`numbered-${index}`} className="professional-numbered-item">
              <div className="number-marker">{number}</div>
              <div className="numbered-text">{formattedListText}</div>
            </div>
          );
        }
      }
      // Handle regular paragraphs
      else if (trimmedLine) {
        const formattedParagraph = formatInlineElements(trimmedLine);
        formattedElements.push(
          <div key={`paragraph-${index}`} className="professional-paragraph">
            {formattedParagraph}
          </div>
        );
      }
      // Handle spacing
      else {
        formattedElements.push(
          <div key={`spacing-${index}`} className="professional-spacing"></div>
        );
      }
    });
    
    return formattedElements;
  };

  const formatInlineElements = (text) => {
    // Handle bold (**text**) and code (`text`)
    const parts = text.split(/(\*\*.*?\*\*|`[^`]+`)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={`bold-${index}`} className="professional-bold">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={`code-${index}`} className="professional-code">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="professional-text-container">
      {formatText(text)}
    </div>
  );
};

const ChatResponse = ({ response }) => {
  if (!response) return null;

  const { candidates, usageMetadata } = response;

  return (
    <div className="response-container">
      <h3 className="response-header">
        <i className="bi bi-chat-square-text"></i>
        AI Response
      </h3>

      {candidates.map((candidate, index) => (
        <div className="candidate-card" key={index}>
          <h5 className="candidate-title">
            <i className="bi bi-lightbulb"></i>
            Response {index + 1}
          </h5>
          <div className="candidate-text">
            <ProfessionalTextFormatter text={candidate.content.parts[0].text} />
          </div>

          {candidate?.citationMetadata?.citationSources?.length > 0 && (
            <div className="citations-section">
              <h6 className="citations-title">
                <i className="bi bi-link-45deg"></i>
                Sources
              </h6>
              <ul className="citations-list">
                {candidate.citationMetadata.citationSources.map(
                  (source, idx) => (
                    <li className="citation-item" key={idx}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="citation-link"
                      >
                        <i className="bi bi-box-arrow-up-right"></i>
                        {source.title || source.url}
                      </a>
                      <small className="text-muted">
                        {" "}(Indexes: {source.startIndex} - {source.endIndex})
                      </small>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      ))}

      <div className="usage-metadata">
        <h4 className="usage-title">
          <i className="bi bi-graph-up"></i>
          Usage Statistics
        </h4>
        <div className="usage-stats">
          <div className="usage-stat">
            <div className="stat-label">Prompt Tokens</div>
            <div className="stat-value">{usageMetadata.promptTokenCount}</div>
          </div>
          <div className="usage-stat">
            <div className="stat-label">Response Tokens</div>
            <div className="stat-value">{usageMetadata.candidatesTokenCount}</div>
          </div>
          <div className="usage-stat">
            <div className="stat-label">Total Tokens</div>
            <div className="stat-value">{usageMetadata.totalTokenCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;
