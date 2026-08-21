import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { CreateLeadBody, HealthStatus, Lead, LeadStats, ListLeadsParams, SectionLayoutItem, SeoSettings, SiteSettings, UpdateLeadBody, UpdateSeoSettingsBody, UpdateSiteSettingsBody } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all leads
 */
export declare const getListLeadsUrl: (params?: ListLeadsParams) => string;
export declare const listLeads: (params?: ListLeadsParams, options?: RequestInit) => Promise<Lead[]>;
export declare const getListLeadsQueryKey: (params?: ListLeadsParams) => readonly ["/api/leads", ...ListLeadsParams[]];
export declare const getListLeadsQueryOptions: <TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<unknown>>(params?: ListLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListLeadsQueryResult = NonNullable<Awaited<ReturnType<typeof listLeads>>>;
export type ListLeadsQueryError = ErrorType<unknown>;
/**
 * @summary List all leads
 */
export declare function useListLeads<TData = Awaited<ReturnType<typeof listLeads>>, TError = ErrorType<unknown>>(params?: ListLeadsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listLeads>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Submit a new lead
 */
export declare const getCreateLeadUrl: () => string;
export declare const createLead: (createLeadBody: CreateLeadBody, options?: RequestInit) => Promise<Lead>;
export declare const getCreateLeadMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadBody>;
}, TContext>;
export type CreateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof createLead>>>;
export type CreateLeadMutationBody = BodyType<CreateLeadBody>;
export type CreateLeadMutationError = ErrorType<void>;
/**
* @summary Submit a new lead
*/
export declare const useCreateLead: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLead>>, TError, {
        data: BodyType<CreateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createLead>>, TError, {
    data: BodyType<CreateLeadBody>;
}, TContext>;
/**
 * @summary Get lead summary statistics
 */
export declare const getGetLeadStatsUrl: () => string;
export declare const getLeadStats: (options?: RequestInit) => Promise<LeadStats>;
export declare const getGetLeadStatsQueryKey: () => readonly ["/api/leads/stats"];
export declare const getGetLeadStatsQueryOptions: <TData = Awaited<ReturnType<typeof getLeadStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLeadStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getLeadStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetLeadStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getLeadStats>>>;
export type GetLeadStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get lead summary statistics
 */
export declare function useGetLeadStats<TData = Awaited<ReturnType<typeof getLeadStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLeadStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a single lead
 */
export declare const getGetLeadUrl: (id: number) => string;
export declare const getLead: (id: number, options?: RequestInit) => Promise<Lead>;
export declare const getGetLeadQueryKey: (id: number) => readonly [`/api/leads/${number}`];
export declare const getGetLeadQueryOptions: <TData = Awaited<ReturnType<typeof getLead>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLead>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getLead>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetLeadQueryResult = NonNullable<Awaited<ReturnType<typeof getLead>>>;
export type GetLeadQueryError = ErrorType<void>;
/**
 * @summary Get a single lead
 */
export declare function useGetLead<TData = Awaited<ReturnType<typeof getLead>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getLead>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update lead status or notes
 */
export declare const getUpdateLeadUrl: (id: number) => string;
export declare const updateLead: (id: number, updateLeadBody: UpdateLeadBody, options?: RequestInit) => Promise<Lead>;
export declare const getUpdateLeadMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
        id: number;
        data: BodyType<UpdateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
    id: number;
    data: BodyType<UpdateLeadBody>;
}, TContext>;
export type UpdateLeadMutationResult = NonNullable<Awaited<ReturnType<typeof updateLead>>>;
export type UpdateLeadMutationBody = BodyType<UpdateLeadBody>;
export type UpdateLeadMutationError = ErrorType<void>;
/**
* @summary Update lead status or notes
*/
export declare const useUpdateLead: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateLead>>, TError, {
        id: number;
        data: BodyType<UpdateLeadBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateLead>>, TError, {
    id: number;
    data: BodyType<UpdateLeadBody>;
}, TContext>;
/**
 * @summary Get all site settings
 */
export declare const getGetSiteSettingsUrl: () => string;
export declare const getSiteSettings: (options?: RequestInit) => Promise<SiteSettings>;
export declare const getGetSiteSettingsQueryKey: () => readonly ["/api/settings"];
export declare const getGetSiteSettingsQueryOptions: <TData = Awaited<ReturnType<typeof getSiteSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiteSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSiteSettings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSiteSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof getSiteSettings>>>;
export type GetSiteSettingsQueryError = ErrorType<unknown>;
/**
 * @summary Get all site settings
 */
export declare function useGetSiteSettings<TData = Awaited<ReturnType<typeof getSiteSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSiteSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update site settings
 */
export declare const getUpdateSiteSettingsUrl: () => string;
export declare const updateSiteSettings: (updateSiteSettingsBody: UpdateSiteSettingsBody, options?: RequestInit) => Promise<SiteSettings>;
export declare const getUpdateSiteSettingsMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSiteSettings>>, TError, {
        data: BodyType<UpdateSiteSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSiteSettings>>, TError, {
    data: BodyType<UpdateSiteSettingsBody>;
}, TContext>;
export type UpdateSiteSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof updateSiteSettings>>>;
export type UpdateSiteSettingsMutationBody = BodyType<UpdateSiteSettingsBody>;
export type UpdateSiteSettingsMutationError = ErrorType<void>;
/**
* @summary Update site settings
*/
export declare const useUpdateSiteSettings: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSiteSettings>>, TError, {
        data: BodyType<UpdateSiteSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSiteSettings>>, TError, {
    data: BodyType<UpdateSiteSettingsBody>;
}, TContext>;
/**
 * @summary Get section layout configuration
 */
export declare const getGetSectionLayoutUrl: () => string;
export declare const getSectionLayout: (options?: RequestInit) => Promise<SectionLayoutItem[]>;
export declare const getGetSectionLayoutQueryKey: () => readonly ["/api/layout"];
export declare const getGetSectionLayoutQueryOptions: <TData = Awaited<ReturnType<typeof getSectionLayout>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSectionLayout>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSectionLayout>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSectionLayoutQueryResult = NonNullable<Awaited<ReturnType<typeof getSectionLayout>>>;
export type GetSectionLayoutQueryError = ErrorType<unknown>;
/**
 * @summary Get section layout configuration
 */
export declare function useGetSectionLayout<TData = Awaited<ReturnType<typeof getSectionLayout>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSectionLayout>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update section layout (order and visibility)
 */
export declare const getUpdateSectionLayoutUrl: () => string;
export declare const updateSectionLayout: (sectionLayoutItem: SectionLayoutItem[], options?: RequestInit) => Promise<SectionLayoutItem[]>;
export declare const getUpdateSectionLayoutMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSectionLayout>>, TError, {
        data: BodyType<SectionLayoutItem[]>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSectionLayout>>, TError, {
    data: BodyType<SectionLayoutItem[]>;
}, TContext>;
export type UpdateSectionLayoutMutationResult = NonNullable<Awaited<ReturnType<typeof updateSectionLayout>>>;
export type UpdateSectionLayoutMutationBody = BodyType<SectionLayoutItem[]>;
export type UpdateSectionLayoutMutationError = ErrorType<void>;
/**
* @summary Update section layout (order and visibility)
*/
export declare const useUpdateSectionLayout: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSectionLayout>>, TError, {
        data: BodyType<SectionLayoutItem[]>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSectionLayout>>, TError, {
    data: BodyType<SectionLayoutItem[]>;
}, TContext>;
/**
 * @summary Get SEO settings (meta tags, OG tags, Schema.org)
 */
export declare const getGetSeoSettingsUrl: () => string;
export declare const getSeoSettings: (options?: RequestInit) => Promise<SeoSettings>;
export declare const getGetSeoSettingsQueryKey: () => readonly ["/api/seo"];
export declare const getGetSeoSettingsQueryOptions: <TData = Awaited<ReturnType<typeof getSeoSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSeoSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSeoSettings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSeoSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof getSeoSettings>>>;
export type GetSeoSettingsQueryError = ErrorType<unknown>;
/**
 * @summary Get SEO settings (meta tags, OG tags, Schema.org)
 */
export declare function useGetSeoSettings<TData = Awaited<ReturnType<typeof getSeoSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSeoSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update SEO settings
 */
export declare const getUpdateSeoSettingsUrl: () => string;
export declare const updateSeoSettings: (updateSeoSettingsBody: UpdateSeoSettingsBody, options?: RequestInit) => Promise<SeoSettings>;
export declare const getUpdateSeoSettingsMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSeoSettings>>, TError, {
        data: BodyType<UpdateSeoSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSeoSettings>>, TError, {
    data: BodyType<UpdateSeoSettingsBody>;
}, TContext>;
export type UpdateSeoSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof updateSeoSettings>>>;
export type UpdateSeoSettingsMutationBody = BodyType<UpdateSeoSettingsBody>;
export type UpdateSeoSettingsMutationError = ErrorType<void>;
/**
* @summary Update SEO settings
*/
export declare const useUpdateSeoSettings: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSeoSettings>>, TError, {
        data: BodyType<UpdateSeoSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSeoSettings>>, TError, {
    data: BodyType<UpdateSeoSettingsBody>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map