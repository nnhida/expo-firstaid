// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaListOl, FaListUl, FaLink, FaImage } from 'react-icons/fa';

// const TextEditor: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [selectedText, setSelectedText] = useState<string>('')
//   const [buttonStates, setButtonStates] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//     alignLeft: false,
//     alignCenter: false,
//     alignRight: false,
//   });

//   useEffect(() => {
//     const updateButtonStates = () => {
//       setButtonStates({
//         bold: document.queryCommandState('bold'),
//         italic: document.queryCommandState('italic'),
//         underline: document.queryCommandState('underline'),
//         alignLeft: document.queryCommandState('justifyLeft'),
//         alignCenter: document.queryCommandState('justifyCenter'),
//         alignRight: document.queryCommandState('justifyRight'),
//       });
//     };

//     document.addEventListener('selectionchange', updateButtonStates);
//     return () => {
//       document.removeEventListener('selectionchange', updateButtonStates);
//     };
//   }, []);

//   const execCommand = (command: string) => {
//     document.execCommand(command, false, '');
//   };

//   const insertLink = () => {
//     const url = prompt('Enter the URL');
//     if (url) {
//       execCommand('createLink');
//       document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
//     }
//   };

//   const insertImage = () => {
//     const imageUrl = prompt('Enter the image URL');
//     if (imageUrl) {
//         document.execCommand('insertImage', false, imageUrl);
//     }
// };

//   const Button = ({ command, icon, title }: { command: string; icon: React.ReactNode; title: string }) => (
//     <button
//       type="button"
//       className={`flex-1 w-20 px-2 py-2 ${buttonStates[command] ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} rounded-md`}
//       onClick={() => execCommand(command)}
//       title={title}
//       aria-pressed={buttonStates[command]}
//     >
//       {icon}
//     </button>
//   );

//   return (
//     <div className="border p-2 rounded-md">
//       {/* Toolbar */}
//       <div className="flex space-x-2 mb-4">
//         <Button command="bold" icon={<FaBold />} title="Bold (Ctrl+B)" />
//         <Button command="italic" icon={<FaItalic />} title="Italic (Ctrl+I)" />
//         <Button command="underline" icon={<FaUnderline />} title="Underline (Ctrl+U)" />
//         <Button command="justifyLeft" icon={<FaAlignLeft />} title="Align Left" />
//         <Button command="justifyCenter" icon={<FaAlignCenter />} title="Align Center" />
//         <Button command="justifyRight" icon={<FaAlignRight />} title="Align Right" />
//         <Button command="insertOrderedList" icon={<FaListOl />} title="Ordered List" />
//         <Button command="insertUnorderedList" icon={<FaListUl />} title="Unordered List" />
//         <Button command="createLink" icon={<FaLink />} title="Insert Link" onClick={insertLink} />
//         <Button command="insertImage" icon={< FaImage />} title="Insert Image" onClick={insertImage} />
//         <input
//           type="color"
//           className="flex-1 w-20 px-2 py-2 border rounded-md"
//           onChange={(e) => execCommand('foreColor', e.target.value)}
//           title="Text Color"
//         />
//       </div>

//       {/* Editable Content Area */}
//       <div
//         ref={editorRef}
//         className="border p-2 rounded-md min-h-[300px] w-full"
//         contentEditable
//         onInput={() => setSelectedText(window.getSelection()?.toString() || '')}
//       >
//         Start typing here...
//       </div>
//     </div>
//   );
// };

// export default TextEditor;