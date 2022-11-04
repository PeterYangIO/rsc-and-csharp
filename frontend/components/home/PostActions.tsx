"use client";

import { CommentIcon, ShareIcon, SmileyIcon } from "@primer/octicons-react";
import { Dispatch, SetStateAction, useState } from "react";

const reactionOptions = ["👍", "👎", "😄", "😕", "❤️", "🎉", "🚀", "👀"] as const;
type ReactionType = typeof reactionOptions[number];
type ReactionsMap = Record<ReactionType, number>;
type PostActionsProps = {
    reactions: ReactionsMap;
    comments: number;
    shares: number;
};

export default function PostActions(props: PostActionsProps) {
    const { reactions, comments, shares } = props;
    const [currentCounts, setReactionCounts] = useState(reactions);

    return (
        <div>
            <div className="mt-2 d-flex flex-justify-between flex-items-baseline">
                <div>
                    <details className="dropdown details-reset details-overlay d-inline-block">
                        <summary className="color-fg-muted p-2 d-inline" aria-haspopup="true">
                            <SmileyIcon />
                        </summary>

                        <ul
                            className="dropdown-menu dropdown-menu-ne d-flex py-2"
                            style={{
                                width: "auto"
                            }}
                        >
                            {reactionOptions.map(reaction => (
                                <ReactionButton
                                    key={reaction}
                                    reaction={reaction}
                                    currentCounts={currentCounts}
                                    originalCounts={reactions}
                                    setReactionCounts={setReactionCounts}
                                    isPopup={true}
                                />
                            ))}
                        </ul>
                    </details>
                    {Object.entries(currentCounts)
                        .sort((a, b) => b[1] - a[1])
                        .filter(([_, count]) => count > 0)
                        .map(([reaction]) => (
                            <ReactionButton
                                key={reaction}
                                reaction={reaction as ReactionType}
                                currentCounts={currentCounts}
                                originalCounts={reactions}
                                setReactionCounts={setReactionCounts}
                            />
                        ))}
                    {Object.values(currentCounts).reduce((a, b) => a + b, 0) === 0 && (
                        <span>Be the first to react!</span>
                    )}
                </div>
                <div>
                    <span className="text-small text-normal color-fg-muted">
                        {comments > 0 && (comments === 1 ? "1 comment" : `${comments} comments`)}
                        {comments > 0 && shares > 0 && " · "}
                        {shares > 0 && (shares === 1 ? "1 share" : `${shares} shares`)}
                    </span>
                </div>
            </div>
            <div
                className="border-top mt-1 pt-3"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                }}
            >
                <button className="btn btn-invisible btn-block width-full color-fg-default">
                    <CommentIcon />
                    <span>Comment</span>
                </button>
                <button className="btn btn-invisible btn-block width-full color-fg-default">
                    <ShareIcon />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
}

function ReactionButton({
    reaction,
    currentCounts,
    originalCounts,
    setReactionCounts,
    isPopup
}: {
    reaction: ReactionType;
    currentCounts: ReactionsMap;
    originalCounts: ReactionsMap;
    setReactionCounts: Dispatch<SetStateAction<ReactionsMap>>;
    isPopup?: boolean;
}) {
    const hasClicked = originalCounts[reaction] !== currentCounts[reaction];
    const count = currentCounts[reaction];

    const onClick = () => {
        if (hasClicked) {
            setReactionCounts(prev => ({ ...prev, [reaction]: prev[reaction] - 1 }));
        } else {
            setReactionCounts(prev => ({ ...prev, [reaction]: prev[reaction] + 1 }));
        }
    };

    let className = "mr-1";
    if (hasClicked) {
        className += " color-bg-accent";
        if (!isPopup) {
            className += " border color-border-accent-emphasis";
        }
    }
    if (!isPopup) {
        className += " Label";
    } else {
        className += " p-1";
    }
    return (
        <button className="btn-octicon p-0" onClick={onClick}>
            <span className={className}>
                {reaction} {isPopup ? "" : count}
            </span>
        </button>
    );
}
