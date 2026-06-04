import type { RecommendInput, RecommendOutput, MockProvider } from '../types/service';
import { getProvidersByService } from '../data/mockProviders';

export function recommendProviders(input: RecommendInput): RecommendOutput {
  const providers = getProvidersByService(input.serviceType);

  const relevant = providers.filter((p) => {
    if (input.hasLTCInsurance !== undefined) {
      if (input.hasLTCInsurance && !p.supportsLTC && input.budget && input.budget < 3000) {
        return false;
      }
    }
    if (input.careLevel === 'severe' && p.type === '社区老年食堂') {
      return false;
    }
    if (input.livingStatus === 'alone' && p.distance > 3) {
      return false;
    }
    return true;
  });

  const sorted = [...(relevant.length > 0 ? relevant : providers)].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.rating > b.rating) scoreA += 3;
    else scoreB += 3;
    if (a.distance < b.distance) scoreA += 2;
    else scoreB += 2;
    if (a.supportsLTC) scoreA += 1;
    if (b.supportsLTC) scoreB += 1;
    if (a.supportsSubsidy) scoreA += 1;
    if (b.supportsSubsidy) scoreB += 1;
    return scoreB - scoreA;
  });

  const bestPrice = sorted.length > 0 ? sorted[0].estimatedCost : '暂无参考价格';
  const hasLTC = sorted.some((p) => p.supportsLTC);
  const hasSubsidy = sorted.some((p) => p.supportsSubsidy);

  let reason = `参考建议：基于"${input.serviceType}"服务类型`;
  if (input.city) reason += `及${input.city}地区`;
  reason += '，参考排序如下。';
  if (input.hasLTCInsurance) {
    reason += '您可能符合长护险条件，可优先考虑支持长护险结算的机构。';
  }
  if (input.livingStatus === 'alone') {
    reason += '考虑到独居情况，建议优先选择3公里范围内的服务提供方。';
  }

  return {
    providers: sorted.slice(0, 6),
    reason,
    budgetSufficient: input.budget ? input.budget >= 800 : true,
    suggestLTC: !input.hasLTCInsurance && hasLTC,
    suggestSubsidy: hasSubsidy,
    suggestInsuranceOrChildPay: input.budget ? input.budget < 2000 : false,
  };
}
