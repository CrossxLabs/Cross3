// https://nextjs.org/docs/basic-features/data-fetching/client-side
import { fetcher } from '@/lib/fetcher'

export function getUserAccountSvc(data) {
  return fetcher({
    url: 'api/user/account',
    method: 'post',
    data,
  })
}

export function getUserStatisticsSvc() {
  return fetcher({
    url: 'api/user/statistics',
  })
}
