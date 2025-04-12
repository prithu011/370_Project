export default playerLeg = ({ pos, leg, rating }) => {
  const qu = `select * from players where pos= ${pos}`
  return qu
}
