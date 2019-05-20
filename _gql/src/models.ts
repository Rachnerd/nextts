export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface GQLQuery {
  items: GQLSearchResult[];
}

export interface GQLItem {
  id: string;

  name: string;
}

export interface GQLNotFound {
  id: string;
}

export interface GQLError {
  id: string;

  message: string;
}

// ====================================================
// Arguments
// ====================================================

export interface GQLItemsQueryArgs {
  ids: string[];
}

// ====================================================
// Unions
// ====================================================

export type GQLSearchResult = GQLItem | GQLNotFound | GQLError;

import { GraphQLResolveInfo } from "graphql";

import { AppContext } from "../context";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, TContext = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface QueryResolvers<TContext = AppContext, TypeParent = {}> {
  items?: QueryItemsResolver<GQLSearchResult[], TypeParent, TContext>;
}

export type QueryItemsResolver<
  R = GQLSearchResult[],
  Parent = {},
  TContext = AppContext
> = Resolver<R, Parent, TContext, QueryItemsArgs>;
export interface QueryItemsArgs {
  ids: string[];
}

export interface ItemResolvers<TContext = AppContext, TypeParent = GQLItem> {
  id?: ItemIdResolver<string, TypeParent, TContext>;

  name?: ItemNameResolver<string, TypeParent, TContext>;
}

export type ItemIdResolver<R = string, Parent = GQLItem, TContext = AppContext> = Resolver<
  R,
  Parent,
  TContext
>;
export type ItemNameResolver<R = string, Parent = GQLItem, TContext = AppContext> = Resolver<
  R,
  Parent,
  TContext
>;

export interface NotFoundResolvers<TContext = AppContext, TypeParent = GQLNotFound> {
  id?: NotFoundIdResolver<string, TypeParent, TContext>;
}

export type NotFoundIdResolver<R = string, Parent = GQLNotFound, TContext = AppContext> = Resolver<
  R,
  Parent,
  TContext
>;

export interface ErrorResolvers<TContext = AppContext, TypeParent = GQLError> {
  id?: ErrorIdResolver<string, TypeParent, TContext>;

  message?: ErrorMessageResolver<string, TypeParent, TContext>;
}

export type ErrorIdResolver<R = string, Parent = GQLError, TContext = AppContext> = Resolver<
  R,
  Parent,
  TContext
>;
export type ErrorMessageResolver<R = string, Parent = GQLError, TContext = AppContext> = Resolver<
  R,
  Parent,
  TContext
>;

export interface SearchResultResolvers {
  __resolveType: SearchResultResolveType;
}
export type SearchResultResolveType<
  R = "Item" | "NotFound" | "Error",
  Parent = GQLItem | GQLNotFound | GQLError,
  TContext = AppContext
> = TypeResolveFn<R, Parent, TContext>;

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  AppContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  AppContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  AppContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<TContext = AppContext> {
  Query?: QueryResolvers<TContext>;
  Item?: ItemResolvers<TContext>;
  NotFound?: NotFoundResolvers<TContext>;
  Error?: ErrorResolvers<TContext>;
  SearchResult?: SearchResultResolvers;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
