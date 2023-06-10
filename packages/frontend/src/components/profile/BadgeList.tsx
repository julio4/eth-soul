import { ProBadgeDetails } from '../../types/badge';
import { CategoryBadge } from './Badge';
import { Box } from '@chakra-ui/react';



// This helper function checks if a badge is a Pro badge.
const isProBadge = (badge) => {
    return Object.values(ProBadgeDetails).some((proBadge) => proBadge.text === badge.text);
};

export const BadgeList = ({ badges }) => {
    const sortedBadges = badges.sort((a, b) => {
        if (isProBadge(a) && !isProBadge(b)) {
            return -1;
        }
        if (!isProBadge(a) && isProBadge(b)) {
            return 1;
        }
        return 0;
    });

    console.log(badges);

    return (
        <Box>
            {
                sortedBadges ? sortedBadges.map((badge, index) => {
                    return (
                        <CategoryBadge key={index} badgeInfo={badge} />
                    )
                }) : < CategoryBadge badgeInfo={{ text: "No Badge Yet", color: "#F3F5F6" }
                } />
            }
        </Box>
    );
};