import { useMemo, useState } from "react";

import Button from "../../components/ui/Button";
import {
    getMasteryCriterionKey,
    getMasteryProgressSummary,
    type CriterionEvidence,
    type Exercise,
    type MasteryCriterion,
} from "../../types";
import { useProgressStore } from "../../stores/progressStore";

type ExerciseProgressPanelProps = {
    exercise: Exercise;
};

function ExerciseProgressPanel({
    exercise,
}: ExerciseProgressPanelProps) {
    const exerciseId = exercise.id;
    const criteria = exercise.mastery.criteria;
    const record = useProgressStore(
        (state) => state.records[exerciseId],
    );

    const recordPracticeSession = useProgressStore(
        (state) => state.recordPracticeSession,
    );

    const setCriterionEvidence = useProgressStore(
        (state) => state.setCriterionEvidence,
    );

    const [sessionSaved, setSessionSaved] = useState(false);

    const summary = useMemo(
        () =>
            getMasteryProgressSummary(
                exercise,
                record,
            ),
        [exercise, record],
    );

    const handlePracticeSession = () => {
        recordPracticeSession(exerciseId);
        setSessionSaved(true);

        window.setTimeout(() => {
            setSessionSaved(false);
        }, 2000);
    };

    return (
        <section className="rounded-lg border border-(--brand)/25 bg-(--brand-soft) p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                        Your progress
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                        Build evidence for mastery
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-(--text-secondary)">
                        Record what you can currently demonstrate. BareGains uses
                        this evidence against the exercise's mastery requirements.
                    </p>
                </div>

                <Button onClick={handlePracticeSession}>
                    {sessionSaved
                        ? "Practice session saved"
                        : "Record practice session"}
                </Button>
            </div>

            <div className="mt-6 rounded-lg border border-(--border) bg-(--surface) p-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-(--text-secondary)">
                            Mastery evidence
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-(--text-primary)">
                            {summary.percentage}%
                        </p>
                    </div>

                    <p className="text-sm font-semibold text-(--text-secondary)">
                        {summary.satisfiedCriteria}/{summary.totalCriteria} criteria
                    </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-(--surface-subtle)">
                    <div
                        className="h-full rounded-full bg-(--brand) transition-[width] duration-300"
                        style={{
                            width: `${summary.percentage}%`,
                        }}
                    />
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {criteria.map((criterion) => {
                    const criterionKey = getMasteryCriterionKey(
                        exerciseId,
                        criterion,
                    );

                    const existingEvidence =
                        record?.criterionEvidence[criterionKey];

                    return (
                        <CriterionEvidenceControl
                            key={criterionKey}
                            criterion={criterion}
                            existingEvidence={existingEvidence}
                            onSave={(evidence) =>
                                setCriterionEvidence(
                                    exerciseId,
                                    criterionKey,
                                    evidence,
                                )
                            }
                        />
                    );
                })}
            </div>

            <div className="mt-5 rounded-md border border-(--border) bg-(--surface) p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
                    Last practiced
                </p>

                <p className="mt-1 text-sm text-(--text-secondary)">
                    {record?.lastPracticedAt
                        ? formatDate(record.lastPracticedAt)
                        : "No practice session recorded yet."}
                </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-(--text-muted)">
                Form quality, tempo, symmetry, and pain-free execution are
                self-reported here. BareGains does not claim to verify those
                qualities automatically.
            </p>
        </section>
    );
}

type CriterionEvidenceControlProps = {
    criterion: MasteryCriterion;
    existingEvidence: CriterionEvidence | undefined;
    onSave: (evidence: CriterionEvidence) => void;
};

function CriterionEvidenceControl({
    criterion,
    existingEvidence,
    onSave,
}: CriterionEvidenceControlProps) {
    switch (criterion.metric) {
        case "reps":
            return (
                <NumericEvidenceControl
                    title="Repetitions"
                    description={`Minimum: ${criterion.minimumReps} controlled reps.`}
                    value={
                        existingEvidence?.metric === "reps"
                            ? existingEvidence.value
                            : 0
                    }
                    min={0}
                    suffix="reps"
                    onSave={(value) =>
                        onSave({
                            metric: "reps",
                            value,
                        })
                    }
                />
            );

        case "sets":
            return (
                <NumericEvidenceControl
                    title="Quality sets"
                    description={`Minimum: ${criterion.minimumSets} quality sets.`}
                    value={
                        existingEvidence?.metric === "sets"
                            ? existingEvidence.value
                            : 1
                    }
                    min={1}
                    suffix="sets"
                    onSave={(value) =>
                        onSave({
                            metric: "sets",
                            value,
                        })
                    }
                />
            );

        case "hold_seconds":
            return (
                <NumericEvidenceControl
                    title="Hold duration"
                    description={`Minimum: ${criterion.minimumSeconds} seconds.`}
                    value={
                        existingEvidence?.metric === "hold_seconds"
                            ? existingEvidence.value
                            : 0
                    }
                    min={0}
                    suffix="seconds"
                    onSave={(value) =>
                        onSave({
                            metric: "hold_seconds",
                            value,
                        })
                    }
                />
            );

        case "range_of_motion":
            return (
                <NumericEvidenceControl
                    title="Range of motion"
                    description={`Minimum: ${criterion.minimumPercent}%.`}
                    value={
                        existingEvidence?.metric === "range_of_motion"
                            ? existingEvidence.percent
                            : 0
                    }
                    min={0}
                    max={100}
                    suffix="%"
                    onSave={(value) =>
                        onSave({
                            metric: "range_of_motion",
                            percent: value,
                        })
                    }
                />
            );

        case "symmetry":
            return (
                <NumericEvidenceControl
                    title="Side-to-side difference"
                    description={`Maximum allowed difference: ${criterion.maximumDifferencePercent}%.`}
                    value={
                        existingEvidence?.metric === "symmetry"
                            ? existingEvidence.differencePercent
                            : 0
                    }
                    min={0}
                    max={100}
                    suffix="% difference"
                    onSave={(value) =>
                        onSave({
                            metric: "symmetry",
                            differencePercent: value,
                        })
                    }
                />
            );

        case "tempo":
            return (
                <BooleanEvidenceControl
                    title="Tempo"
                    description={formatTempoRequirement(criterion)}
                    passed={
                        existingEvidence?.metric === "tempo"
                            ? existingEvidence.passed
                            : false
                    }
                    onSave={(passed) =>
                        onSave({
                            metric: "tempo",
                            passed,
                        })
                    }
                />
            );

        case "form":
            return (
                <BooleanEvidenceControl
                    title="Form"
                    description={`${criterion.checks.length} form checks must be consistently demonstrated.`}
                    passed={
                        existingEvidence?.metric === "form"
                            ? existingEvidence.passed
                            : false
                    }
                    details={criterion.checks}
                    onSave={(passed) =>
                        onSave({
                            metric: "form",
                            passed,
                        })
                    }
                />
            );

        case "pain_free":
            return (
                <BooleanEvidenceControl
                    title="Pain-free execution"
                    description="Record whether you can currently perform the exercise without pain."
                    passed={
                        existingEvidence?.metric === "pain_free"
                            ? existingEvidence.value
                            : false
                    }
                    onSave={(passed) =>
                        onSave({
                            metric: "pain_free",
                            value: passed,
                        })
                    }
                />
            );
    }
}

type NumericEvidenceControlProps = {
    title: string;
    description: string;
    value: number;
    min: number;
    max?: number;
    suffix: string;
    onSave: (value: number) => void;
};

function NumericEvidenceControl({
    title,
    description,
    value,
    min,
    max,
    suffix,
    onSave,
}: NumericEvidenceControlProps) {
    const [draft, setDraft] = useState(String(value));
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const parsed = Number(draft);

        if (!Number.isFinite(parsed)) {
            return;
        }

        const boundedValue = Math.min(
            max ?? Number.POSITIVE_INFINITY,
            Math.max(min, parsed),
        );

        onSave(boundedValue);
        setDraft(String(boundedValue));
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 1500);
    };

    return (
        <div className="rounded-md border border-(--border) bg-(--surface) p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-semibold text-(--text-primary)">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                        {description}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <label className="sr-only" htmlFor={`${title}-value`}>
                        {title}
                    </label>

                    <input
                        id={`${title}-value`}
                        type="number"
                        inputMode="decimal"
                        min={min}
                        max={max}
                        step="1"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        className="w-24 rounded-md border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--brand) focus:ring-2 focus:ring-(--brand)/20"
                    />

                    <span className="text-sm text-(--text-secondary)">
                        {suffix}
                    </span>

                    <Button
                        variant="secondary"
                        onClick={handleSave}
                    >
                        {saved ? "Saved" : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

type BooleanEvidenceControlProps = {
    title: string;
    description: string;
    passed: boolean;
    details?: readonly string[];
    onSave: (passed: boolean) => void;
};

function BooleanEvidenceControl({
    title,
    description,
    passed,
    details,
    onSave,
}: BooleanEvidenceControlProps) {
    const [draft, setDraft] = useState(passed);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        onSave(draft);
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 1500);
    };

    return (
        <div className="rounded-md border border-(--border) bg-(--surface) p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-semibold text-(--text-primary)">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                        {description}
                    </p>

                    {details?.length ? (
                        <ul className="mt-3 space-y-1.5 pl-5 text-sm leading-6 text-(--text-secondary)">
                            {details.map((detail) => (
                                <li key={detail} className="list-disc">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setDraft(true)}
                        className={[
                            "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                            draft
                                ? "bg-(--success)/15 text-(--success)"
                                : "bg-(--surface-subtle) text-(--text-secondary)",
                        ].join(" ")}
                    >
                        Meets requirement
                    </button>

                    <button
                        type="button"
                        onClick={() => setDraft(false)}
                        className={[
                            "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                            !draft
                                ? "bg-(--danger)/10 text-(--danger)"
                                : "bg-(--surface-subtle) text-(--text-secondary)",
                        ].join(" ")}
                    >
                        Not yet
                    </button>

                    <Button
                        variant="secondary"
                        onClick={handleSave}
                    >
                        {saved ? "Saved" : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

function formatTempoRequirement(
    criterion: Extract<MasteryCriterion, { metric: "tempo" }>,
) {
    const parts = [
        criterion.eccentricSeconds
            ? `${criterion.eccentricSeconds}s eccentric`
            : null,
        criterion.pauseSeconds
            ? `${criterion.pauseSeconds}s pause`
            : null,
        criterion.concentricSeconds
            ? `${criterion.concentricSeconds}s concentric`
            : null,
    ].filter(Boolean);

    return parts.length > 0
        ? parts.join(" · ")
        : "Use the required movement tempo consistently.";
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

export default ExerciseProgressPanel;