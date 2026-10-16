// Edit here: Tabs component
export function Tabs({ tabs, activeTab, onTabChange }: { tabs: string[]; activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {tabs.map(tab => (
        <button key={tab} className={`btn sm ${activeTab === tab ? 'primary' : ''}`} onClick={() => onTabChange(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}
