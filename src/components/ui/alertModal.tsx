import { useEffect, useState } from 'react';
import { Button } from './button';
import { Modal } from './modal';
import { Loader } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  description: string;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  description
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Modal
      title="Are you sure?"
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
          Continue {loading && <Loader className="h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </Modal>
  );
};
