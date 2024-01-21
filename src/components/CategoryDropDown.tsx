import React, { useState } from 'react'
import { threadCategories } from '../utils/utils';
import { FaChevronDown } from 'react-icons/fa';

interface CategoryDropDownProps {
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    name?: string;
    onChange?: (event: React.ChangeEvent<{ name: string; value: string }>) => void;
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ selectedCategory, setSelectedCategory, name, onChange }) => {
    const categories: string[] = [...threadCategories, 'None'];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelectCategory = (category: string) => {
        if (onChange) {
            onChange({ target: { name: name || 'category', value: category } } as React.ChangeEvent<{ name: string; value: string }>)
        }
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700 
                    bg-white border border-gray-300 rounded-md shadow-sm hover:bg-secondary focus:ring-1 focus:ring-black focus:border-black"
                >
                    {selectedCategory || 'Select a category'}
                    <FaChevronDown className="ml-2 mt-1" style={{ fontSize: '0.8rem' }} />
                </button>
            </div>
            {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleSelectCategory(category)}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryDropDown
