'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import getMessage from '@/src/api/prompts/getMessage';
import patchMessage from '@/src/api/prompts/patchMessage';
import {StorageMessage} from '@/src/interfaces/prompt';
import icons from '@/public/svgs/prompt';

const Storage = () => {
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [messages, setMsg] = useState<StorageMessage[]>();

  useEffect(() => {
    // コメントを取得する処理
    getMessage(1, 1, 1, 5).then(res => {
      console.log(res);
      setMsg(res);
      setIsOpen(new Array(res.length).fill(false)); // コメントの開閉状態を初期化
    });
  }, []);

  const handleClickDelete = (messageId: number) => {
    // コメントを削除する処理
    patchMessage(1, 1, messageId, false).then(res => {
      console.log(res);
    });
  };

  const toggleDropdown = (index: number) => {
    setIsOpen(prev => prev.map((open, i) => (i === index ? !open : open))); // クリックしたコメントの開閉状態を反転
  };

  return (
    <div className="w-full h-full">
      {messages?.map((message, index) => {
        return (
          <div key={index} className="pb-2">
            <div
              className="w-full border-2 p-4 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => toggleDropdown(index)}
            >
              <div className="w-full">{message.question}</div>
              <div
                onClick={() => {
                  handleClickDelete(parseInt(message.id));
                }}
              >
                <Image src={icons.delete} width={25} height={25} alt="icon" />
              </div>
            </div>
            {isOpen[index] ? (
              <div className="w-full border-2 p-4 rounded-lg bg-gray-100">
                {message.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Storage;
