import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkModal: React.FC<BookmarkModalProps> = ({ isOpen, onClose }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(count => count + 1);
    console.log('Button clicked!', clickCount + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Hello World! 👋
          </DialogTitle>
          <DialogDescription className="text-center text-lg mb-6">
            Welcome to your Chrome Bookmark Manager! This modal was triggered by pressing{' '}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              Cmd+Shift+K
            </kbd>{' '}
            (Mac) or{' '}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
              Ctrl+Shift+K
            </kbd>{' '}
            (Windows/Linux).
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <Button 
            onClick={handleButtonClick}
            size="lg"
            className="font-semibold"
          >
            Click Me! {clickCount > 0 && `(${clickCount})`}
          </Button>
          
          {clickCount > 0 && (
            <p className="text-sm text-muted-foreground text-center">
              You've clicked the button {clickCount} time{clickCount !== 1 ? 's' : ''}! 🎉
            </p>
          )}
          
          <div className="text-xs text-muted-foreground text-center mt-4">
            <p>Press <kbd>Escape</kbd> or click the X to close this modal</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
