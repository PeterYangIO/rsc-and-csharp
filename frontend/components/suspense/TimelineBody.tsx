import { CheckCircleFillIcon, CircleIcon, NoEntryFillIcon, XCircleFillIcon } from "@primer/octicons-react";
import { LoadingDuration } from "../../app/suspense/page";
import { formatNumber } from "../../util";

function TimelineComponent({ badge, children }: { badge: React.ReactNode; children: React.ReactNode }) {
    return (
        <>
            <div className="TimelineItem-badge">{badge}</div>
            <div className="TimelineItem-body">{children}</div>
        </>
    );
}

export async function TimelineBody({ promise }: { promise: Promise<LoadingDuration> }) {
    try {
        const { index, resolveDuration } = await promise;
        return (
            <TimelineComponent
                badge={
                    resolveDuration < 5000 ? (
                        <CheckCircleFillIcon className="color-fg-success" />
                    ) : (
                        <NoEntryFillIcon className="color-fg-attention" />
                    )
                }
            >
                <span className="text-semibold">Item {index}</span> resolved after {formatNumber(resolveDuration)}
            </TimelineComponent>
        );
    } catch (e) {
        if (e instanceof Error) {
            return (
                <TimelineComponent badge={<XCircleFillIcon className="color-fg-danger" />}>
                    {e.message}
                </TimelineComponent>
            );
        }
        return null;
    }
}

export function TimelineBodyLoading() {
    return (
        <TimelineComponent badge={<CircleIcon />}>
            Loading
            <span className="AnimatedEllipsis" />
        </TimelineComponent>
    );
}
