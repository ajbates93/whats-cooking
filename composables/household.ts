export const useHousehold = () => {
  const { supabase } = useDatabase()
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
      const { data, error: householdError } = await supabase
        .from('households')
        .insert(household)
        .select('id')

      if (!data) return;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          household_id: data[0].id
        })
        .eq('id', user.value.id)
    }
    catch (householdError) {
      console.error(householdError)
    }
    finally {
      loading.value = false
    }
  }

  const fetchHousehold = async () => {
    try {
      const { data: profile } = await fetchProfile()
      const household_id = profile?.household_id;

      if (!household_id)
        throw new Error('No household_id field.')

      const { data: household } = await supabase
        .from('households')
        .select('id, name')
        .eq('id', profile?.household_id!)
        .single()
      const { data: additionalUsers } = await supabase
        .from('profiles')
        .select()
        .eq('household_id', profile?.household_id!)
  
      if (!household || !additionalUsers)
        throw new Error('No household or additional users found.')
      const data = {
        id: household?.id!,
        name: household?.name!,
        users: additionalUsers,
      }
      return data
    } catch (error) {
      console.error(error)
    }
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
