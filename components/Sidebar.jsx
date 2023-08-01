// components/Sidebar.js
const aiTools = [
    {
      name: 'neoSVG',
      purpose: '文字轉 SVG ',
      logo: '/assets/ai-tools/neosvg.jpeg',
      pageUrl: 'https://neosvg.com/?via=topaitools',
    },
    {
      name: 'Artify',
      purpose: '塗鴉轉圖片',
      logo: '/assets/ai-tools/artify.png',
      pageUrl: 'https://www.google.com/search?q=artify&sourceid=chrome&ie=UTF-8',
    },
    {
        name: 'Recolorai',
        purpose: '圖片自動著色',
        logo: '/assets/ai-tools/recolorai.webp',
        pageUrl: 'https://recolorai.com/',
    },
    {
        name: 'ChatwithPDF',
        purpose: '與你的 PDF 聊天',
        logo: '/assets/ai-tools/pdf.webp',
        pageUrl: 'https://chatwithpdf.ai/?via=topaitools',
    }
  ];
  
  const Sidebar = ({ isOpen, onToggle }) => {
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-toggle" onClick={onToggle}>
          <div className="toggle-icon"></div>
        </div>
        <div className={`sidebar-content ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-lg font-bold">AI 工具推薦</h2>
          <div>
            {aiTools.map((tool) => (
              <div key={tool.name} className="bg-white mb-3 p-3 rounded-lg flex items-center hover:bg-slate-100">
                <img src={tool.logo} alt={tool.name} key={tool.name} className="w-[40px] h-[30px] object-cover rounded-lg"/>
                <div className="ml-3">
                    <a href={tool.pageUrl} className="text-lg font-bold">{tool.name}</a>
                    <p className="text-sm">{tool.purpose}</p>
                    
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  