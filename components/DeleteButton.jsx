'use client'

import { useRouter } from 'next/navigation'
import { deleteEntry } from '@/app/actions';
import { useState } from 'react';
import Modal from './Modal';

export default function DeleteButton({ entryId, onDeleteStart }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function handleDelete () {
        setShowModal(true);
    }

    async function confirmDelete () {
        if (!isDeleting) {
            setIsDeleting(true);
            onDeleteStart?.();
            try {
                await deleteEntry(entryId);
                router.push('/journal');
            } catch (error) {
                console.error('Error deleting entry:', error);
            } finally {
                setIsDeleting(false);
                setShowModal(false);
            }
        }
    }

    return (
        <>
            <button
                type='button'
                disabled={isDeleting}
                onClick={handleDelete}
                className={`
                    w-full 
                    mt-6 
                    px-4 
                    py-2 
                    bg-red-500 
                    hover:bg-red-600 
                    text-white 
                    rounded-lg 
                    transition-colors 
                    duration-200 
                    flex 
                    items-center 
                    justify-center 
                    space-x-2
                    mx-auto
                    max-w-[200px]
                    ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {isDeleting ? (
                    <span>Deleting...</span>
                ) : (
                    <>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                        >
                            <path
                                fillRule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span>Delete Entry</span>
                    </>
                )}
            </button>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title='Delete Entry'
                message='Are you sure you want to delete this entry? This action cannot be undone.'
            />
        </>
    );
}