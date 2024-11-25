import moment from 'moment-timezone'

const currentTimes = () => {
    return moment.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');; 
}

export default currentTimes
