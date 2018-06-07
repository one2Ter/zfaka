layui.define(['layer', 'form'], function(exports){
	var $ = layui.jquery;
	var layer = layui.layer;
	var form = layui.form;
	function createTime(v){
								var date = new Date();
								date.setTime(parseInt(v)*1000);
								var y = date.getFullYear();
								var m = date.getMonth()+1;
								m = m<10?'0'+m:m;
								var d = date.getDate();
								d = d<10?("0"+d):d;
								var h = date.getHours();
								h = h<10?("0"+h):h;
								var M = date.getMinutes();
								M = M<10?("0"+M):M;
								var s = date.getSeconds();
								s = s<10?("0"+s):s;
								var str = y+"-"+m+"-"+d+" "+h+":"+M+":"+s;
								return str;
	}
	
	form.on('submit(query)', function(data){
		data.field.csrf_token = TOKEN;
		var i = layer.load(2,{shade: [0.5,'#fff']});
		$.ajax({
			url: '/product/query/ajax/',
			type: 'POST',
			dataType: 'json',
			data: data.field,
		})
		.done(function(res) {
			if (res.code == '1') {
				var html = "";
				var list = res.data;
				for (var i = 0, j = list.length; i < j; i++) {
					html += '<tr><td>'+list[i].productname+'</td><td>'+list[i].number+'</td><td>'+list[i].money+'</td><td>'+createTime(list[i].addtime)+'</td><td>'+list[i].status+'</td></tr>';
				}
				$("#query-table tbody").prepend(html);
				$("#query-table").show();
				layer.msg(res.msg,{icon:1,time:5000});
			} else {
				layer.msg(res.msg,{icon:2,time:5000});
			}
		})
		.fail(function() {
			layer.msg('服务器连接失败，请联系管理员',{icon:2,time:5000});
		})
		.always(function() {
			layer.close(i);
		});

		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});
	
	exports('productquery',null)
});