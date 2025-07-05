import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { LINK_REGEX } from '../constants';
import Toast from 'react-native-toast-message';

interface Link {
    link: string;
    id: string;
}

interface UseHandleListLinksStorageReturn {
    add: (link: string) => void;
    remove: (link: string) => void;
    links: Link[];
}

const KEY_LIST_LINKS_STORAGE = 'KEY_LIST_LINKS_STORAGE';

export const useHandleListLinksStorage = (): UseHandleListLinksStorageReturn => {

    const [links, setLinks] = useState<Link[]>([]);

    const getSavedLinks = async (): Promise<Link[]> => {
        const savedLinks = await AsyncStorage.getItem(KEY_LIST_LINKS_STORAGE);

        if (!savedLinks) {
            return [];
        }

        const normalizedLinks: Link[] = JSON.parse(savedLinks);

        return normalizedLinks;
    };

    const handleDefineLinks = async () => {
        const savedLinks: Link[] = await getSavedLinks();

        setLinks(savedLinks);
    };

    const add = async (link: string) => {

        if(!LINK_REGEX.test(link)) {
            Toast.show({
                type: 'error',
                text1: 'Link inválido!',
            });

            return;
        }

        const savedLinks: Link[] = await getSavedLinks();

        if(link.length === 0) {
            return;
        }

        savedLinks.push({link, id: uuid.v4()});
        await AsyncStorage.setItem(KEY_LIST_LINKS_STORAGE, JSON.stringify(savedLinks));
        handleDefineLinks();
    };

    const remove = async (id: string) => {
        const savedLinks: Link[] = await getSavedLinks();

        if(id.length === 0) {
            return;
        }

        const foundedLink = savedLinks.find(savedLink => savedLink.id === id);

        if(!foundedLink) {
            return;
        }

        const newListLinks: Link[] = savedLinks.filter(savedLink => savedLink.id !== id);
        await AsyncStorage.setItem(KEY_LIST_LINKS_STORAGE, JSON.stringify(newListLinks));
        handleDefineLinks();
    };

    useEffect(() => {
        handleDefineLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        links,
        add,
        remove,
    };
};
