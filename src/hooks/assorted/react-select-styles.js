const style1 = {
    control: (state) =>
      `p-3 border rounded-sm font-lato transition-all bg-wiseGrey4/15 cursor-pointer
      
      ${
        state.isFocused ? 'border-wiseGrey3/30' : 'border-wiseGrey4/20'
      }`,
    menu: () => 
      'mt-1 bg-wiseGrey5 rounded-md border border-gray-200 shadow-lg font-lato z-50 overflow-hidden',
    option: (state) =>
      `p-2 text-sm cursor-pointer p-3 font-lato transition-all ${
        state.isSelected 
        ? 'bg-wiseRose3/40' 
        : state.isFocused 
        ? 'bg-wiseGrey4/30 text-bgMain' 
        : 'text-gray-700 hover:bg-gray-100'
      }`,
    placeholder: () => 'text-gray-400 font-lato text-sm cursor-pointer',
    singleValue: () => 'text-bgMain font-lato text-sm cursor-pointer',
    dropdownIndicator: () => 'text-gray-400 p-1 cursor-pointer',
};

export {
    style1
}