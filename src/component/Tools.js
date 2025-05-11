import React, {useState} from 'react'
import HtmlToText from './HtmlToText';
import TextToBold from './TextToBold'
import "./Tools.css"

const Tools = () => {
    const [activeTab, setActiveTab] = useState('unicode');
  return (
    <div className="container max-w-4xl mx-auto p-0 mt-74 app_container">
    <div className="flex border-b mb-4">
      <button
        className={`html_tool_button tool_button px-4 py-2 fnr ${activeTab === 'unicode' ? 'border-b-2 border-black font-semibold active_tab' : ''}`}
        onClick={() => setActiveTab('unicode')}
      >
        Text Bold
      </button>
      <button
        className={`html_tool_button tool_button px-4 py-2 fnr ${activeTab === 'markdown' ? 'border-b-2 border-black font-semibold active_tab' : ''}`}
        onClick={() => setActiveTab('markdown')}
      >
        Format Long Content
      </button>
    </div>

    <div>
      {activeTab === 'unicode' && <TextToBold />}
      {activeTab === 'markdown' && <HtmlToText />}
    </div>
  </div>
  )
}

export default Tools;