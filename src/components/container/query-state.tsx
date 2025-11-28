import React from 'react';

type SingleProps = {
  isLoading: boolean;
  skeleton: React.ReactNode;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  data?: never;
  Skeleton?: never;
  skeletonCount?: never;
};

type ListProps<T> = {
  isLoading: boolean;
  skeletonCount?: number;
  Skeleton: React.ComponentType<{ idx?: number; length?: number }>;
  data?: T[];
  fallback?: React.ReactNode;
  children: (item: T, idx: number, length: number) => React.ReactNode;
  skeleton?: never;
};

type QueryStateCompProps<T> = SingleProps | ListProps<T>;

export default function QueryStateComp<T>(props: QueryStateCompProps<T>) {
  const { isLoading } = props;

  if ('Skeleton' in props && props.Skeleton) {
    const { data, Skeleton, skeletonCount = 3, fallback, children } = props;

    if (isLoading) {
      return (
        <>
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <Skeleton
              key={`skeleton-${idx}`}
              idx={idx}
              length={skeletonCount}
            />
          ))}
        </>
      );
    }

    if (!data || data.length === 0) {
      return <>{fallback ?? null}</>;
    }

    return <>{data.map((item, idx) => children(item, idx, data.length))}</>;
  }

  const { skeleton, children, fallback } = props;

  if (isLoading) return <>{skeleton}</>;
  if (!children && fallback) return <>{fallback}</>;
  return <>{children}</>;
}
