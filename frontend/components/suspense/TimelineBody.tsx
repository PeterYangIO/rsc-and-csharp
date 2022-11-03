import { CheckCircleFillIcon, CircleIcon, NoEntryFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import { formatNumber } from "../../util";
import { LoadingDuration } from "./page";

export async function TimelineBody({ promise }: { promise: Promise<LoadingDuration> }) {
    try {
        const { index, resolveDuration } = await promise;
        return (
            <>
                <div className="TimelineItem-badge">
                    {resolveDuration < 5000 ? (
                        <CheckCircleFillIcon className="color-fg-success" />
                    ) : (
                        <NoEntryFillIcon className="color-fg-attention" />
                    )}
                </div>
                <div className="TimelineItem-body">
                    <span className="text-semibold">Item {index}</span> resolved after {formatNumber(resolveDuration)}
                </div>
            </>
        );
    } catch (e) {
        if (e instanceof Error) {
            return (
                <>
                    <div className="TimelineItem-badge">
                        <XCircleFillIcon className="color-fg-danger" />
                    </div>
                    <div className="TimelineItem-body text-italic">{e.message}</div>
                </>
            );
        }
        return null;
    }
}

export function TimelineBodyLoading() {
    return (
        <>
            <div className="TimelineItem-badge">
                <CircleIcon />
            </div>
            <div className="TimelineItem-body">
                <div>
                    Loading
                    <span className="AnimatedEllipsis" />
                </div>
            </div>
        </>
    );
}
