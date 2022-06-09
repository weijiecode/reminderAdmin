import { ref, reactive, toRefs } from 'vue';

export default function(){
    const data = reactive({
        month: '',
        date: '',
        hours: 0
    });
    data.hours = new Date().getHours()
    return {
        ...toRefs(data)
    }
}