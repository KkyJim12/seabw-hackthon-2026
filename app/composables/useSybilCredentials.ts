export type ParticipationRequirement = {
  kyc?: boolean
  x?: boolean
  minStake?: number
}

const kycCredential = ref({
  provider: 'Sumsub',
  verified: true,
  nationality: 'Thailand',
  age: 28
})

const xCredential = ref({
  connected: true,
  handle: '@basevault_user',
  followers: 12840,
  accountAgeMonths: 42
})

const stakedUsdc = ref(750)

export const useSybilCredentials = () => {
  const stakeUsdc = (amount: number) => {
    if (amount <= 0) {
      return
    }

    stakedUsdc.value += amount
  }

  const requirementLabels = (requirement?: ParticipationRequirement) => {
    if (!requirement) {
      return []
    }

    const labels = []

    if (requirement.kyc) {
      labels.push('KYC')
    }

    if (requirement.x) {
      labels.push('X verified')
    }

    if (requirement.minStake) {
      labels.push(`${requirement.minStake.toLocaleString()} USDC staked`)
    }

    return labels
  }

  const canParticipate = (requirement?: ParticipationRequirement) => {
    if (!requirement) {
      return true
    }

    if (requirement.kyc && !kycCredential.value.verified) {
      return false
    }

    if (requirement.x && !xCredential.value.connected) {
      return false
    }

    if (requirement.minStake && stakedUsdc.value < requirement.minStake) {
      return false
    }

    return true
  }

  return {
    kycCredential,
    xCredential,
    stakedUsdc,
    stakeUsdc,
    requirementLabels,
    canParticipate
  }
}
