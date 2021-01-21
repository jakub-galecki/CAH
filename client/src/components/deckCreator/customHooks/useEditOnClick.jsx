import { useEffect, useState } from 'react';

const useEditOnClick = (isEditing, initialContent, containerRef, inputRef) => {
  const [editing, setEditing] = useState(isEditing);
  const [content, setContent] = useState(initialContent);

  const handleClickOutside = e => {
    if (containerRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setEditing(false);
  };

  const handleEnterClick = e => {
    if (e.key == 'Enter') {
      setEditing(false);
    }
  };

  useEffect(() => {
    if (editing) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEnterClick);
      inputRef.current.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEnterClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEnterClick);
    };
  }, [editing]);

  return [editing, content, setEditing, setContent];
};

export { useEditOnClick };
