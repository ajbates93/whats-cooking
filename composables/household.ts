type Household = {
}

export const useHousehold = () => {
  const supabase = useSupabaseClient()
  const { user } = useAuth()
  const loading = ref(false)

  const createHousehold = async (name: string) => {
    try {
      if (!user.value) return;
      const household = {
        created_by: user.value.id,
        admin_id: user.value.id,
        name: name
      }
      loading.value = true
      const { error } = await supabase
        .from('households')
        .insert(household)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  } 

  const fetchHouseholdForAdmin = async () => {
    const { data } = await supabase
      .from('households')
      .select('id, name')
      .eq('admin_id', user.value?.id)
      .single()
    return { data } 
  }

  const fetchUsersForHousehold = async (householdId: number) => {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .eq('household_id', householdId)

    return { data }
  }

  return { createHousehold, fetchHouseholdForAdmin, fetchUsersForHousehold, loading }
}
