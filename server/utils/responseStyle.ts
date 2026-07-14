export const sendUserDataAsResponse = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  avatar: true,
  gender: true,
  dateOfBirth: true,
  status: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  createdAt: true,
  profile: {
    select: {
      profession: true,
      occupation: true,
      company: true,
      bio: true,
      preferredLanguage: true,
      timezone: true,
      profileCompletionPercentage: true,
    }
  },
  roles: {
    select: {
      status: true,
      role: { select: { name: true, slug: true } }
    }
  },
  notificationSetting: {
    select: {
      pushNotification: true,
      emailNotification: true,
      smsNotification: true,
    }
  },
  addresses: {
    where: { deletedAt: null },
    select: {
      id: true,
      label: true,
      receiverName: true,
      receiverPhone: true,
      area: true,
      house: true,
      isDefault: true
    }
  }
}