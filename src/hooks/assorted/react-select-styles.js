const style1 = {
    control: (state) =>
      `p-1 border font-lato text-sm transition-all bg-white cursor-pointer ${
        state.isFocused ? 'border-wiseRose4 ring-1 ring-wiseRose4' : 'border-gray-300'
      }`,
    menu: () => 
      'mt-1 bg-white border border-gray-200 shadow-lg font-lato z-50 overflow-hidden cursor-pointer',
    option: (state) =>
      `p-2 text-sm cursor-pointer font-lato transition-all ${
        state.isSelected ? 'bg-wiseRose2 text-white' : state.isFocused ? 'bg-wiseRose4 text-bgMain' : 'text-gray-700 hover:bg-gray-100'
      }`,
    placeholder: () => 'text-gray-400 font-lato text-sm cursor-pointer',
    singleValue: () => 'text-bgMain font-lato text-sm cursor-pointer',
    dropdownIndicator: () => 'text-gray-400 p-1 cursor-pointer',
};

export {
    style1
}