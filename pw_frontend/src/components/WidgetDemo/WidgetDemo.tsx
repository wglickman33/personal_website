import { useState, useEffect, useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { Project } from '../../data/projects';
import './WidgetDemo.scss';

interface WidgetDemoProps {
  project: Project;
}

const WidgetDemo = ({ project }: WidgetDemoProps) => {
  const { theme } = useTheme();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableTabs = useMemo(() => {
    const tabs: Array<'html' | 'css' | 'js' | 'react' | 'tsx' | 'scss'> = [];
    if (project.widgetCode?.tsx) tabs.push('tsx');
    if (project.widgetCode?.scss) tabs.push('scss');
    if (project.widgetCode?.html) tabs.push('html');
    if (project.widgetCode?.css) tabs.push('css');
    if (project.widgetCode?.js) tabs.push('js');
    if (project.widgetCode?.react) tabs.push('react');
    return tabs;
  }, [project.widgetCode]);

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'react' | 'tsx' | 'scss'>(availableTabs[0] || 'tsx');

  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [availableTabs, activeTab]);

  if (!project.widgetCode && !project.widgetComponent) {
    return null;
  }

  const getCodeToDisplay = (): string => {
    if (!project.widgetCode) return '';
    
    switch (activeTab) {
      case 'html':
        return project.widgetCode.html || '';
      case 'css':
        return project.widgetCode.css || '';
      case 'js':
        return project.widgetCode.js || '';
      case 'react':
        return project.widgetCode.react || '';
      case 'tsx':
        return project.widgetCode.tsx || '';
      case 'scss':
        return project.widgetCode.scss || '';
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    const code = getCodeToDisplay();
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const WidgetComponent = project.widgetComponent;

  return (
    <div className={`widget-demo widget-demo--${theme}`}>
      <div className="widget-demo__interactive">
            <div className="widget-demo__demo-area">
              {WidgetComponent ? (
                <WidgetComponent />
              ) : (
                <div 
                  className="widget-demo__html-preview"
                  dangerouslySetInnerHTML={{ __html: project.widgetCode?.html || '' }}
                />
              )}
            </div>
      </div>

      {project.widgetCode && (
        <div className="widget-demo__code-section">
          <div className="widget-demo__code-header">
            <button
              className={`widget-demo__toggle ${showCode ? 'widget-demo__toggle--active' : ''}`}
              onClick={() => setShowCode(!showCode)}
            >
              <span className="material-symbols-outlined">
                {showCode ? 'code_off' : 'code'}
              </span>
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>

          {showCode && (
            <div className="widget-demo__code-viewer">
              {availableTabs.length > 1 && (
                <div className="widget-demo__code-tabs">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab}
                      className={`widget-demo__code-tab ${activeTab === tab ? 'widget-demo__code-tab--active' : ''}`}
                      onClick={() => setActiveTab(tab as 'html' | 'css' | 'js' | 'react' | 'tsx' | 'scss')}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              <div className="widget-demo__code-content">
                <div className="widget-demo__code-header-actions">
                  <button
                    className="widget-demo__copy-button"
                    onClick={handleCopy}
                    aria-label="Copy code"
                  >
                    <span className="material-symbols-outlined">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="widget-demo__code">
                  <code>{getCodeToDisplay()}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WidgetDemo;

