import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Divider,
    Card,
    CardBody,
    Icon,
} from '@chakra-ui/react';

import { Author } from '@types/app';
import { CategoryBadge } from './Badge';
import { BadgeList } from './BadgeList';

type ShortProfilePageProps = {
    author: Author;
};

export function ShortProfilePage({ author }: ShortProfilePageProps) {
    return (
        <BadgeList badges={author.badges}/>
    );
}