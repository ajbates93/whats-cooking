export const useAuth = () => {
  // const { supabase } = useDatabase() 
  // const user = useSupabaseUser()
  const loading = ref(false)

  const signIn = async (email: string) => {
    // try {
    //   loading.value = true
    //   const { error } = await supabase.auth.signInWithOtp({ email })
    //   if (error)
    //     throw error
    //   alert('Check your email for the login link')
    // }
    // catch (error) {
    //   alert(error)
    // }
    // finally {
    //   loading.value = false
    // }
  }

  const signOut = async () => {
    // try {
    //   loading.value = true
    //   const { error } = await supabase.auth.signOut()
    //   if (error)
    //     throw error
    //   user.value = null
    // }
    // catch (error) {
    //   alert(error)
    // }
    // finally {
    //   loading.value = false
    // }
  }

  const fetchProfile = async () => {
    // const { data } = await supabase
    //   .from('profiles')
    //   .select('username, avatar_url, household_id')
    //   .eq('id', user.value!.id)
    //   .single()

    // return { data }
  }

  const updateProfile = async (username: string, avatar_path: string) => {
  //   try {
  //     loading.value = true

  //     if (!user.value) throw new Error('No user')

  //     const now = new Date()
  //     const updates = {
  //       id: user.value.id,
  //       username,
  //       avatar_url: avatar_path,
  //       updated_at: now.toDateString(),
  //     }

  //     const { error } = await supabase.from('profiles').update(updates)
  //     // const { error } = await supabase.from('profiles').upsert(updates, {
  //     //   returning: 'minimal',
  //     // })
  //     if (error)
  //       throw error
  //   }
  //   catch (error) {
  //     alert(error)
  //   }
  //   finally {
  //     loading.value = false
  //   }
  }

  return { 
    // user, 
    signIn, signOut, fetchProfile, updateProfile, loading }
}