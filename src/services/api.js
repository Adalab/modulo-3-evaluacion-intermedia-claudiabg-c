const callToApi = () => {
  return fetch(
    "https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json"
  )
    .then((response) => response.json())
    .then((response) => {
      const result = response.results.map((student) => {
        return {
          id: student.id,
          name: student.name,
          tutor: student.counselor,
          specialty: student.speciality,
          social: student.social_networks,
        };
      });
      return result;
    });
};

export default callToApi;
