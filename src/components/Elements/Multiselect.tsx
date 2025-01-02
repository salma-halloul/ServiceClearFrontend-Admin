import React, { useState, useRef } from "react";

interface Option {
  value: string;
  text: string;
  selected: boolean;
}

interface MultiSelectProps {
  options: Option[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setShow(!show);

  const selectOption = (value: string) => {
    let newSelected: string[] = [];
    if (selectedOptions.includes(value)) {
      newSelected = selectedOptions.filter((v) => v !== value);
    } else {
      newSelected = [...selectedOptions, value];
    }
    onChange(newSelected);
  };

  const removeOption = (value: string) => {
    const newSelected = selectedOptions.filter((v) => v !== value);
    onChange(newSelected);
  };

  return (
    <div className="relative z-50">
      <div className="flex flex-col items-center">
        <input name="values" type="hidden" value={selectedOptions.join(",")} />
        <div className="relative z-20 inline-block w-full">
          <div className="relative flex flex-col items-center">
            <div ref={triggerRef} onClick={toggleDropdown} className="w-full">
              <div className="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                <div className="flex flex-auto flex-wrap gap-3">
                  {selectedOptions.map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return (
                      <div
                        key={value}
                        className="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                      >
                        <div className="max-w-full flex-initial">{option?.text}</div>
                        <div
                          onClick={() => removeOption(value)}
                          className="cursor-pointer pl-2 hover:text-danger"
                        >
                          &times;
                        </div>
                      </div>
                    );
                  })}
                  {selectedOptions.length === 0 && (
                    <div className="flex-1">
                      <input
                        placeholder="Select an option"
                        className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                        disabled
                      />
                    </div>
                  )}
                </div>
                <div className="flex w-8 items-center py-1 pl-1 pr-1">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {show && (
              <div
                className="max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input"
                ref={dropdownRef}
              >
                <div className="flex w-full flex-col">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                      onClick={() => selectOption(option.value)}
                    >
                      <div
                        className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
                          selectedOptions.includes(option.value)
                            ? "border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex w-full items-center">
                          <div className="mx-2 leading-6">{option.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
