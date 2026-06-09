export const FREE_SERVICE_JOBS = 5;
export const SERVICE_COMMISSION_RATE = 0.10;
export const PRODUCT_COMMISSION_RATE = 0.05;

export function calculateServiceCommission(completedJobs, jobPrice) {
  if (completedJobs < FREE_SERVICE_JOBS) {
    return {
      isFree: true,
      freeJobsLeft: FREE_SERVICE_JOBS - completedJobs,
      commission: 0,
      providerGets: jobPrice,
      appGets: 0
    };
  }

  const appGets = Math.round(jobPrice * SERVICE_COMMISSION_RATE);
  return {
    isFree: false,
    freeJobsLeft: 0,
    commission: SERVICE_COMMISSION_RATE,
    providerGets: jobPrice - appGets,
    appGets
  };
}

export function calculateProductCommission(productPrice) {
  const appGets = Math.round(productPrice * PRODUCT_COMMISSION_RATE);
  return {
    commission: PRODUCT_COMMISSION_RATE,
    sellerGets: productPrice - appGets,
    appGets
  };
}
