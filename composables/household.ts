interface Household {
  id: string
  name: string
  users: []
}

export const useHousehold = () => {
  const supabase = useSupabaseClient()
  const { user, fetchProfile } = useAuth()
  const loading = ref(false)

  const createHousehold = async (name: string) => {
    try {
      if (!user.value)
        return
      const household = {
        created_by: user.value.id,
        admin_id: user.value.id,
        name,
      }
      loading.value = true
      const { error } = await supabase
        .from('households')
        .insert(household)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      loading.value = false
    }
  }

  const fetchHousehold = async () => {
    const { data: profile } = await fetchProfile()
    const { data: household } = await supabase
      .from('households')
      .select('id, name')
      .eq('id', profile?.household_id)
      .single()
    const { data: additionalusers } = await supabase
      .from('profiles')
      .select()
      .eq('household_id', profile?.household_id)

    const h: Household = {
      id: household?.id,
      name: household?.name,
      users: additionalusers,
    }
    return { data }
  }

  const fetchUsersForHousehold = async (householdId: number) => {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('household_id', householdId)

    return { data }
  }

  return { createHousehold, fetchHousehold, fetchUsersForHousehold, loading }
}
