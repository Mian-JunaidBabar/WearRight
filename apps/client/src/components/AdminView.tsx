import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Tag, Clock, TrendingUp, Search, Filter, Download, Edit2, Plus, X, CheckSquare, Square, Check, Trash2 } from 'lucide-react';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY, COLOR_OPTIONS } from '../data';

export default function AdminView() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchVal, setSearchVal] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  
  // Modals stats state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // New item form stats
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const [newCategory, setNewCategory] = useState('Formalwear');
  const [newTags, setNewTags] = useState('Matte, Modern');
  const [newColor, setNewColor] = useState('Obsidian');

  // Rows selection toggles
  const toggleSelectAll = () => {
    if (selectedRowIds.length === inventoryList.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(inventoryList.map(item => item.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(item => item !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  // Search items filter
  const filteredInventory = useMemo(() => {
    if (!searchVal.trim()) return inventoryList;
    const lower = searchVal.toLowerCase();
    return inventoryList.filter(item => 
      item.name.toLowerCase().includes(lower) || 
      item.id.toLowerCase().includes(lower) ||
      item.category.toLowerCase().includes(lower)
    );
  }, [inventoryList, searchVal]);

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newId) return;

    // Use default premium fashion silhouette image mock URLs in index list
    const defaultImages = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ODxf2GHcJDWnpGpL3Qi5POG7fL1rLEU7MMLEt6hp8ZWrKUCPaXMheOe362WccVBCiwUrkvxygL2NEdlSmEmD0JE933ilq96YIqAKN50yFD2VKbloC_nPpzbNI7e2fBau2CLCCNpm0MmAkWvghKsvcRVKPFIkghx_SBLZgGruRZ1u5kIo3T0c-9zLJSyIEK62L-ALcjIXXSrtjt2s0S5_2s3L11smXecLZfAzn0IXebWP01FaeG5TfisjwhmzrE9sUaipW1IzFNY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByOdotW7UkUNDLWqjKQoFjwcAoGNRvMVqP3Qey0ugbTidtW7zHo76b9D7QRyh65Oe5PiJ2k7QVtvbQmiKJPVTQa_kL_3gcG1InpgIxHmlJXj8tnN_2lOAmtdXKSjSSOfgKu1sZgtF8udRHlxNwGqaT-bBvCVa6ZLDU4wFQOnHR8fc89TR79agCHA9J9i_nYq8gcPOdiy-SiNWC7ciH1z46P23FMDk32A04XJ8KcvIuEuXOm_xWjGLExkeX3wm7xHAq6nlb9TGJ4-g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB51vQefl9UYLhBWySpSN5K4DQcFalfQ1iu3k7W2PthaqChMJBuuYaKATAWMzAF0THikEv0cSmQOjg9xI3tkPP5RMXzruuss0QoelGFYWJ1Jx1y0V2Q59IIHJ68_YhHLV93VXdq16RjOQF9FF7zRqIxOcXQ0OG0-U_YKazJY5pHcGKvmxahGrsOI8MP2HxK3EcakhKvg8E2zeHVZ_jj12hE8B1j0rkoY2oultCF9KQYycVeblaBvNhF0Svrvh403TASYqzXRAyFqUU'
    ];
    const imageToUse = defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const newItem: InventoryItem = {
      id: newId,
      name: newName,
      category: newCategory,
      image: imageToUse,
      colors: [newColor],
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setInventoryList([newItem, ...inventoryList]);
    setIsAddModalOpen(false);
    
    // Reset Form stats
    setNewName('');
    setNewId('');
    setNewCategory('Formalwear');
    setNewTags('Matte, Modern');
  };

  const startEditing = (item: InventoryItem) => {
    setEditingItem(item);
    setNewName(item.name);
    setNewId(item.id);
    setNewCategory(item.category);
    setNewTags(item.tags.join(', '));
    setNewColor(item.colors[0] || 'Obsidian');
    setIsEditModalOpen(true);
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = inventoryList.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          name: newName,
          category: newCategory,
          colors: [newColor],
          tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
        };
      }
      return item;
    });

    setInventoryList(updated);
    setIsEditModalOpen(false);
    setEditingItem(null);
    setNewName('');
    setNewId('');
  };

  const deleteRow = (id: string) => {
    setInventoryList(inventoryList.filter(item => item.id !== id));
    setSelectedRowIds(selectedRowIds.filter(rid => rid !== id));
  };

  return (
    <div className="w-full bg-slate-50 pb-24 text-left font-sans">
      <div className="max-w-[1080px] mx-auto px-6 py-12">
        
        {/* Inventory Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="font-sans">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">Inventory</h2>
            <p className="text-sm text-slate-500 mt-2 font-sans max-w-lg font-medium">
              Manage physical stock profiles, metadata values, and catalog tracking codes for the stylist recommendation loop.
            </p>
          </div>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-6 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            Add New Product Entry
          </button>
        </div>

        {/* Dynamic Metrics grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Total Products */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1">Total Products</span>
              <Package className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-slate-900">{2480 + inventoryList.length}</p>
              <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 inline" /> +12% THIS MONTH
              </p>
            </div>
          </div>

          {/* Card 2: Active tags */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1">Active Tags</span>
              <Tag className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-slate-900">15,093</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold font-mono">Stylist indexed coordinates</p>
            </div>
          </div>

          {/* Card 3: Pending review */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600" />
            
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold mb-1">Pending Review</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-slate-900">34</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold font-mono">Requires manual metadata check</p>
            </div>
          </div>

        </div>

        {/* Data Table Panel card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
          
          {/* Table toolbar */}
          <div className="p-4 border-b border-slate-150 bg-slate-50/70 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search inventory codes..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-blue-600 focus:border shadow-sm text-xs py-2.5 pl-9 pr-3 rounded-lg focus:ring-0 focus:outline-none placeholder-slate-400 font-bold font-sans"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => alert("Simulation: Filters preset saved.")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-all select-none cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-550" /> Filter
              </button>
              <button 
                onClick={() => alert("CSV Export simulation triggered successfully.")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-all select-none cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-550" /> Export
              </button>
            </div>

          </div>

          {/* Actual items table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-150 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">
                  <th className="p-4 w-12 text-center select-none">
                    <button onClick={toggleSelectAll} className="p-1 text-slate-400 hover:text-black focus:outline-none cursor-pointer">
                      {selectedRowIds.length === inventoryList.length ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-350" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">AI Color Tags</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs font-sans">
                {filteredInventory.map((item) => {
                  const isChecked = selectedRowIds.includes(item.id);
                  return (
                    <tr 
                      key={item.id}
                      className={`hover:bg-slate-50/50 transition-colors ${
                        isChecked ? 'bg-slate-50/20' : ''
                      }`}
                    >
                      <td className="p-4 text-center select-none">
                        <button onClick={() => toggleSelectRow(item.id)} className="p-1 text-slate-400 hover:text-black focus:outline-none cursor-pointer">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-350" />
                          )}
                        </button>
                      </td>
                      
                      {/* Name thumbnail column */}
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-14 bg-slate-100 object-cover rounded-lg shadow-sm border border-slate-150"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono mt-1 font-bold">
                              ID: {item.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-slate-500 font-sans">
                        {item.category}
                      </td>

                      {/* Tag chips */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {item.colors.map(col => (
                            <span 
                              key={col}
                              className="px-2.5 py-0.5 bg-blue-50/80 border border-blue-200 text-[10px] font-bold uppercase tracking-wider text-slate-850 rounded-md font-sans"
                            >
                              {col}
                            </span>
                          ))}
                          {item.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Row actions */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex justify-end gap-2.5 items-center">
                          <button 
                            onClick={() => startEditing(item)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Record Parameters"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <button 
                            onClick={() => deleteRow(item.id)}
                            className="p-1 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table pagination stats footer */}
          <footer className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-[11px] font-bold text-slate-400 font-sans">
            <div>
              Showing {filteredInventory.length} entries matching search filters
            </div>
            <div className="flex gap-1.5 select-none">
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-slate-500 hover:bg-white transition-all cursor-pointer font-bold">Prev</button>
              <button className="px-3 py-1 bg-blue-600 border border-blue-600 text-white font-bold rounded-lg cursor-pointer">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-slate-500 hover:bg-white transition-all cursor-pointer font-bold">2</button>
              <button className="px-3 py-1 border border-slate-200 rounded-lg text-slate-500 hover:bg-white transition-all cursor-pointer font-bold">Next</button>
            </div>
          </footer>

        </div>

      </div>

      {/* Add New Entry Modal overlay dialog */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-8 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display text-2xl font-bold mb-2 text-slate-905">Add New Product Entry</h3>
              <p className="text-xs text-slate-400 mb-6 font-sans font-medium">Establish metadata tracking parameters and tags inside the styling database matrix.</p>
              
              <form onSubmit={handleAddNewItem} className="space-y-4">
                
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Item Title Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Silk Evening Dress"
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs px-3 py-2.5 outline-none rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Stock ID Code</label>
                    <input 
                      type="text" 
                      value={newId}
                      onChange={(e) => setNewId(e.target.value)}
                      placeholder="e.g. WR-102-G"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs px-3 py-2.5 outline-none rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg text-slate-900 font-semibold focus:ring-1 focus:ring-blue-600 focus:border-blue-600 cursor-pointer"
                    >
                      <option value="Formalwear">Formalwear</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Footwear">Footwear</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Optic Color Tag</label>
                    <select
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg text-slate-900 font-semibold focus:ring-1 focus:ring-blue-600 focus:border-blue-600 cursor-pointer"
                    >
                      {COLOR_OPTIONS.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Custom Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="e.g. Matte, Evening"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs px-3 py-2.5 outline-none rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3.5 px-6 rounded-xl tracking-widest mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100"
                >
                  <Plus className="w-4 h-4 text-white" />
                  Insert Entry Into Stock
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Entry Modal overlay */}
      <AnimatePresence>
        {isEditModalOpen && editingItem && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-8 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingItem(null);
                }}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display text-2xl font-bold mb-2 text-slate-900">Edit Record Parameters</h3>
              <p className="text-xs text-slate-400 mb-6 font-sans font-medium">Modify stock identifiers and algorithmic style tags inside the stylist database.</p>
              
              <form onSubmit={handleUpdateItem} className="space-y-4">
                
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Item Title Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs px-3 py-2.5 outline-none rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Item Code ID (Read-only)</label>
                    <input 
                      type="text" 
                      value={newId}
                      disabled
                      className="w-full bg-slate-100 border border-slate-250 text-xs px-3 py-2.5 rounded-lg text-slate-400 font-semibold cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg text-slate-900 font-semibold focus:ring-1 focus:ring-blue-600 focus:border-blue-600 cursor-pointer"
                    >
                      <option value="Formalwear">Formalwear</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Footwear">Footwear</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Optic Color Tag</label>
                    <select
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg text-slate-900 font-semibold focus:ring-1 focus:ring-blue-600 focus:border-blue-600 cursor-pointer"
                    >
                      {COLOR_OPTIONS.map(opt => (
                        <option key={opt.name} value={opt.name}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Model Tags</label>
                    <input 
                      type="text" 
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs px-3 py-2.5 outline-none rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3.5 px-6 tracking-widest mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100 rounded-xl"
                >
                  <Check className="w-4 h-4 text-white" />
                  Save Record Parameters
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
