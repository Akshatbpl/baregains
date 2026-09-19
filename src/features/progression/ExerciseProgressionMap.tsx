import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type {
    Exercise,
    ExerciseId,
    ExerciseProgressRecord,
    ExerciseRelationship,
} from "../../types";

import {
    getExerciseProgressStatus,
} from "../../types";

import {
    getComplementaryExercises,
    getPrerequisitesForExercise,
    getProgressionsForExercise,
    getRegressionsForExercise,
    getExerciseById,
} from "../../data/exercises";

type ExerciseProgressionMapProps = {
    exercise: Exercise;
    records: Readonly<
        Record<ExerciseId, ExerciseProgressRecord>
    >;
};

type RelationshipExercise = {
    readonly exercise: Exercise;
    readonly relationship: ExerciseRelationship;
};

function resolveRelationships(
    relationships: readonly ExerciseRelationship[],
    resolveExerciseId: (
        relationship: ExerciseRelationship,
    ) => ExerciseId,
): readonly RelationshipExercise[] {
    return relationships
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .map((relationship) => {
            const relatedExercise = getExerciseById(
                resolveExerciseId(relationship),
            );

            if (!relatedExercise) {
                return undefined;
            }

            return {
                exercise: relatedExercise,
                relationship,
            };
        })
        .filter(
            (
                item,
            ): item is RelationshipExercise =>
                item !== undefined,
        );
}

function ExerciseProgressionMap({
    exercise,
    records,
}: ExerciseProgressionMapProps) {
    const regressions = resolveRelationships(
        getRegressionsForExercise(exercise.id),
        (relationship) => relationship.targetExerciseId,
    );

    const progressions = resolveRelationships(
        getProgressionsForExercise(exercise.id),
        (relationship) => relationship.targetExerciseId,
    );

    const prerequisites = resolveRelationships(
        getPrerequisitesForExercise(exercise.id),
        (relationship) => relationship.sourceExerciseId,
    );

    const complementary = resolveRelationships(
        getComplementaryExercises(exercise.id),
        (relationship) => relationship.targetExerciseId,
    );

    const hasLadder =
        regressions.length > 0 ||
        progressions.length > 0;

    const hasSupportingRelationships =
        prerequisites.length > 0 ||
        complementary.length > 0;

    return (
        <section className="rounded-lg border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                    Progression map
                </p>

                <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
                    Where this movement sits
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-(--text-secondary)">
                    BareGains uses explicit movement relationships rather than
                    assuming that every harder exercise is automatically the
                    next step.
                </p>
            </div>

            {hasLadder ? (
                <>
                    <div className="mt-6 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(18rem,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-4">
                        <RelationshipColumn
                            eyebrow="Easier"
                            title="Regressions"
                            description="Use these when the current movement cannot yet be performed with the required control."
                            items={regressions}
                            records={records}
                        />

                        <div className="flex items-center justify-center">
                            <ArrowRight
                                size={22}
                                strokeWidth={1.8}
                                className="text-(--text-muted)"
                                aria-hidden="true"
                            />
                        </div>

                        <CurrentExerciseCard
                            exercise={exercise}
                            records={records}
                        />

                        <div className="flex items-center justify-center">
                            <ArrowRight
                                size={22}
                                strokeWidth={1.8}
                                className="text-(--text-muted)"
                                aria-hidden="true"
                            />
                        </div>

                        <RelationshipColumn
                            eyebrow="Harder"
                            title="Progressions"
                            description="These are explicitly authored next steps after mastery."
                            items={progressions}
                            records={records}
                        />
                    </div>

                    <div className="mt-6 space-y-4 lg:hidden">
                        <RelationshipColumn
                            eyebrow="Easier"
                            title="Regressions"
                            description="Use these when the current movement cannot yet be performed with the required control."
                            items={regressions}
                            records={records}
                        />

                        <div className="flex justify-center">
                            <ArrowDown
                                size={22}
                                strokeWidth={1.8}
                                className="text-(--text-muted)"
                                aria-hidden="true"
                            />
                        </div>

                        <CurrentExerciseCard
                            exercise={exercise}
                            records={records}
                        />

                        <div className="flex justify-center">
                            <ArrowDown
                                size={22}
                                strokeWidth={1.8}
                                className="text-(--text-muted)"
                                aria-hidden="true"
                            />
                        </div>

                        <RelationshipColumn
                            eyebrow="Harder"
                            title="Progressions"
                            description="These are explicitly authored next steps after mastery."
                            items={progressions}
                            records={records}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-6 rounded-md border border-dashed border-(--border-strong) bg-(--surface-subtle) p-5">
                    <p className="font-semibold text-(--text-primary)">
                        No ladder relationships yet
                    </p>

                    <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                        This exercise currently has no explicit regression or
                        progression edge in the catalog.
                    </p>
                </div>
            )}

            {hasSupportingRelationships ? (
                <div className="mt-6 grid gap-4 border-t border-(--border) pt-6 md:grid-cols-2">
                    {prerequisites.length > 0 ? (
                        <RelationshipColumn
                            eyebrow="Before this"
                            title="Prerequisites"
                            description="Capabilities or movements that support readiness for this exercise."
                            items={prerequisites}
                            records={records}
                        />
                    ) : null}

                    {complementary.length > 0 ? (
                        <RelationshipColumn
                            eyebrow="Alongside it"
                            title="Complementary work"
                            description="Related qualities worth developing alongside this movement."
                            items={complementary}
                            records={records}
                        />
                    ) : null}
                </div>
            ) : null}
        </section>
    );
}

type RelationshipColumnProps = {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly RelationshipExercise[];
    records: Readonly<
        Record<ExerciseId, ExerciseProgressRecord>
    >;
};

function RelationshipColumn({
    eyebrow,
    title,
    description,
    items,
    records,
}: RelationshipColumnProps) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                {eyebrow}
            </p>

            <h3 className="mt-1 text-lg font-semibold text-(--text-primary)">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                {description}
            </p>

            {items.length > 0 ? (
                <div className="mt-4 space-y-3">
                    {items.map(({ exercise, relationship }) => (
                        <RelationshipExerciseCard
                            key={`${relationship.relationshipType}-${exercise.id}`}
                            exercise={exercise}
                            records={records}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-4 rounded-md border border-dashed border-(--border) p-4">
                    <p className="text-sm text-(--text-muted)">
                        No exercises currently listed.
                    </p>
                </div>
            )}
        </div>
    );
}

type RelationshipExerciseCardProps = {
    exercise: Exercise;
    records: Readonly<
        Record<ExerciseId, ExerciseProgressRecord>
    >;
};

function RelationshipExerciseCard({
    exercise,
    records,
}: RelationshipExerciseCardProps) {
    const status = getExerciseProgressStatus(
        exercise,
        records[exercise.id],
    );

    return (
        <Link
            to={`/exercises/${exercise.id}`}
            className="block rounded-md border border-(--border) bg-(--surface) p-4 transition-[background-color,border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-(--border-strong) hover:bg-(--surface-subtle) hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
        >
            <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-(--text-primary)">
                    {exercise.name}
                </h4>

                <StatusPill status={status} />
            </div>

            <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                {exercise.summary}
            </p>
        </Link>
    );
}

type CurrentExerciseCardProps = {
    exercise: Exercise;
    records: Readonly<
        Record<ExerciseId, ExerciseProgressRecord>
    >;
};

function CurrentExerciseCard({
    exercise,
    records,
}: CurrentExerciseCardProps) {
    const status = getExerciseProgressStatus(
        exercise,
        records[exercise.id],
    );

    return (
        <div className="relative rounded-lg border-2 border-(--brand) bg-(--brand-soft) p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--brand)">
                        You are here
                    </p>

                    <h3 className="mt-1 text-xl font-bold tracking-tight text-(--text-primary)">
                        {exercise.name}
                    </h3>
                </div>

                <StatusPill status={status} />
            </div>

            <p className="mt-3 text-sm leading-6 text-(--text-secondary)">
                This is the movement currently being evaluated in the
                progression path.
            </p>
        </div>
    );
}

type StatusPillProps = {
    status:
    | "not_started"
    | "in_progress"
    | "mastered";
};

function StatusPill({ status }: StatusPillProps) {
    const label =
        status === "mastered"
            ? "Mastered"
            : status === "in_progress"
                ? "In progress"
                : "Not started";

    const className =
        status === "mastered"
            ? "bg-(--success)/15 text-(--success)"
            : status === "in_progress"
                ? "bg-(--brand-soft) text-(--brand)"
                : "bg-(--surface-subtle) text-(--text-muted)";

    return (
        <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
        >
            {label}
        </span>
    );
}

export default ExerciseProgressionMap;