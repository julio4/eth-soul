import { ProBadgeDetails} from "../../types/badge";
import { Category } from "../../types/category";

interface BadgeProps {
    category: Category
}

const Badge: React.FC<BadgeProps> = ({ category }) => {
    const badgeInfo = ProBadgeDetails[category]

    return (
        <span style={{ backgroundColor: badgeInfo.color }}>
            {badgeInfo.text}
        </span>
    )
}

export { Badge }