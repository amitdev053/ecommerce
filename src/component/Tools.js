import React, {useState} from 'react'
import HtmlToText from './HtmlToText';
import TextToBold from './TextToBold'
import "./Tools.css"
import { ShareButton } from './HandleShare';

const Tools = () => {
    const [activeTab, setActiveTab] = useState('unicode');
  return (
    <div className="container max-w-4xl mx-auto p-0 mt-74 app_container d-flex flex-column">
    <div className="flex border-b mb-4 tools_link_header">
      <button
        className={`html_tool_button tool_button px-4 py-2 fnr app_tools_button ${activeTab === 'unicode' ? 'border-b-2 border-black font-semibold active_tab' : ''}`}
        onClick={() => setActiveTab('unicode')}
      >
        Text Bold
      </button>
      <button
        className={`html_tool_button tool_button px-4 app_tools_button   py-2 fnr ${activeTab === 'markdown' ? 'border-b-2 border-black font-semibold active_tab' : ''}`}
        onClick={() => setActiveTab('markdown')}
      >
        Format Long Content
      </button>
    </div>

    <div>
      {activeTab === 'unicode' && <TextToBold />}
      {activeTab === 'markdown' && <HtmlToText />}
    </div>
    {/* <ShareButton btnClass={"tools_Share"} productTitle={"✨ BrowseNext – Free Bold Caption for Social Media ✨"} productDesc={"Make your captions bold & stylish instantly! then just copy & paste"} callingFrom={"tools"} /> */}
  </div>
  )
}

export default Tools;