<template>
    <div style = "font-size:14px">
        <p style="color: rgb(86,86,86);font-family: Inter, sans-serif;">
            This website prides itself as a wannabe quasi-reddit || hackernews-alternative for the Biohacking-community. It's main focus is human-enhancement, which implies all topics surrounding nootropics, ergogenics and alike, but not body-hacking as in "Intra-cranial-stuff".<br><br>
            Grelin was mainly developed as a response to the ever-increasing shadow-banning/spamming and echo-chambers within /r/nootropics. <br><br>It therefore has the intention to provide people with a platform to discuss and research <i><b>science</b></i> and not anecdotes and "experiences". ¨
            
            <br><br>Additionally, due to the ever-increasing censoring happening on reddit, we don't have any limitations on free-speech here. Say whatever you want.            
            Grelin is strictly scientitific unlike /r/nootropics and other forums. It's primary and overall purpose is to function as a "somewhat organized" collection of clinical studies for those pursuing human-enhancement and health-benefits. If you find bugs, dont hate me.
            <br><br>
            The crawler runs every day around midnight in Los-Angeles😅
        </p>
        <hr>
        <div class="row" style="font-family: Inter;color: rgb(84,84,84); ">
            <div class="col">
                <p style="margin-bottom: 0px;font-weight: bold;color: var(--bs-dark);">
                    Members
                </p>
                <p style="margin-bottom: 0px;">
                    {{ settings.websiteinfo.members }}
                </p>
            </div>
            <div class="col">
                <p style="margin-bottom: 0px;font-weight: bold;color: var(--bs-dark);">
                    Current time
                </p>
                <p style="margin-bottom: 0px;">
                    {{ currentTime }}
                </p>
            </div>
        </div>
        <div class="row" style="font-family: Inter;color: rgb(84,84,84);margin-top: 15px;">
            <div class="col">
                    <i class="fas fa-info-circle" style="font-size: 16pxpx;margin-right: 5px;"></i>
                    <span class = "font-weight-bold">
                        Information and Rules:
                    </span>
                <ol>
                    <li>Keep the "human" and "animal"-subs scientific. No personal questions, anecdotes etc. Treat the other subs accordingly. Use the report-button lavishly.
                    </li>
                    <li>
                        We don't ban anyone given you're not spamming like crazy. Everything is allowed as in free-speech.</li>
                    <li>
                        If there's something you're unsure of, just ask in the Q&A or send me an email. I'll answer at some point, or someone else will.
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    import settings from "@/settings.js";
    import { ref } from "vue";

    var currentTime = ref("");

    setInterval(() => {
        var now = new Date();
        currentTime.value = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    }, 1000)

    export default{
        setup(){
            return{
                settings,
                currentTime
            }
        }
    }

</script>
