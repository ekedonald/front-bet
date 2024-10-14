import { useCallback, useMemo, useState } from 'react';

import { Modal, ModalPropsType } from '@/components/Elements';
import { useToggle } from '@/hooks';

type ModalOptionType = Omit<ModalPropsType, 'isOpen' | 'closeModal' | 'children' | 'title'>;
type ShowModalType = {
  title?: string;
  options?: ModalOptionType;
  showModal: (onClose?: () => void) => JSX.Element;
};

/**
 * Returns a modal component, and a function to render the component.
 *
 */
export const useModal = (): [
  JSX.Element | null,
  ({ title, showModal, options }: ShowModalType) => void
] => {
  const [openModal, toggleModal] = useToggle(false);
  const [modalContent, setModalContent] = useState<null | {
    content: JSX.Element;
    title?: string;
    options?: ModalOptionType;
  }>(null);

  const onClose = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const modalComponent = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, options } = modalContent;

    return (
      <Modal {...options} title={title} isOpen={openModal} closeModal={onClose}>
        {content}
      </Modal>
    );
  }, [modalContent, onClose, openModal]);

  const showModal = useCallback(
    ({ title, options, showModal }: ShowModalType) => {
      setModalContent({ content: showModal(onClose), title, options });
      toggleModal();
    },

    [onClose, toggleModal]
  );

  return [modalComponent, showModal];
};
